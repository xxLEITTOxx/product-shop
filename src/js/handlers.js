import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  showErrorToast,
  activeFirstBtn,
  addToStorage,
  isProductInStorage,
  removeFromStorage,
  removeActiveBtn,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
} from './helpers';
import { refs } from './refs';
import { STORAGE_KEYS } from './constants';
import {
  fetchByCategory,
  requestProducts,
  fetchCategories,
  requestProductById,
  searchProducts,
  fetchProducts,
  requestProductsLoadMore,
  searchProductsLoadMore,
} from './products-api.js';

import {
  renderCategories,
  renderProducts,
  renderModalProduct,
  renderProductsLoadMore,
} from './render-function';

import { openModal } from './modal.js';

let currentPage = 1;

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
    // showLoader();
  } catch (error) {
    console.log(error);
  }
  // } finally {
  //   hideLoader();
  // }
}

export async function getOneCategories(product) {
  try {
    const data = await fetchByCategory(product);
    renderProducts(data.products);

    if (data.products.length === 0 && product !== 'All') {
      refs.notFoundModal.classList.add('not-found--visible');
    }
    if (data.total <= 12) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

export async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = refs.searchInput.value.trim();

  if (!query) {
    showErrorToast('Please enter a search term');
    return;
  }

  // Сбрасываем currentPage при поиске
  currentPage = 1;

  // Безопасная работа с loader - проверяем его наличие
  if (refs.loader) {
    refs.loader.classList.add('visible');
  }

  try {
    const products = await searchProducts(query);
    hideLoader();
    showLoadMoreButton();

    // Убираем loader если он существует
    if (refs.loader) {
      refs.loader.classList.remove('visible');
    }

    refs.productsList.innerHTML = '';

    if (products.length === 0) {
      if (refs.notFound) {
        refs.notFound.classList.add('not-found--visible');
      }
      return;
    }

    if (refs.notFound) {
      refs.notFound.classList.remove('not-found--visible');
    }
    renderProducts(products.products);

    if (products.total <= 12) {
      hideLoadMoreButton();
    }

    if (refs.clearSearchBtn) {
      refs.clearSearchBtn.classList.add('visible');
    }
  } catch (error) {
    if (refs.loader) {
      refs.loader.classList.remove('visible');
    }
    showErrorToast('Search failed. Please try again.');
    console.error(error);
  }
}

export async function handleClearSearch() {
  refs.searchInput.value = '';

  // Сбрасываем currentPage при очистке поиска
  currentPage = 1;

  if (refs.clearSearchBtn) {
    refs.clearSearchBtn.classList.remove('visible');
  }

  if (refs.notFound) {
    refs.notFound.classList.remove('not-found--visible');
  }

  if (refs.loader) {
    refs.loader.classList.add('visible');
  }

  try {
    const products = await fetchProducts();
    showLoadMoreButton();

    if (refs.loader) {
      refs.loader.classList.remove('visible');
    }

    refs.productsList.innerHTML = '';

    if (products.length === 0) {
      if (refs.notFound) {
        refs.notFound.classList.add('not-found--visible');
      }
      return;
    }

    renderProducts(products);
    if (products.total <= 12) {
      hideLoadMoreButton();
    }
  } catch (error) {
    if (refs.loader) {
      refs.loader.classList.remove('visible');
    }
    showErrorToast('Failed to load products');
    console.error(error);
  }
}

export function onModalActionsClick(event) {
  const button = event.target.closest('.modal-product__btn');
  if (!button) {
    return;
  }

  const { id } = button.dataset;
  const isCartBtn = button.classList.contains('modal-product__btn--cart');
  const storageKey = isCartBtn ? STORAGE_KEYS.CART : STORAGE_KEYS.WISHLIST;
  const productType = isCartBtn ? 'cart' : 'wishlist';
  const productTypeCapitalized = isCartBtn ? 'Cart' : 'Wishlist';

  if (isProductInStorage(storageKey, id)) {
    removeFromStorage(storageKey, id);
    button.textContent = `Add to ${productTypeCapitalized}`;
    iziToast.info({
      title: 'Removed',
      message: `Product removed from your ${productType}.`,
      position: 'topRight',
      timeout: 1000,
    });
  } else {
    addToStorage(storageKey, id);
    button.textContent = `Remove from ${productTypeCapitalized}`;
    iziToast.success({
      title: 'Success',
      message: `Product added to your ${productType}!`,
      position: 'topRight',
      timeout: 1000,
    });
  }
}

export async function onProductClick(event) {
  const productCard = event.target.closest('.products__item');

  if (!productCard) {
    return;
  }

  const { id } = productCard.dataset;

  try {
    const data = await requestProductById(id);
    renderModalProduct(data);
    openModal();
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  // Сбрасываем currentPage для категории "All"
  currentPage = 1;

  try {
    const data = await requestProducts(currentPage);
    renderProducts(data);
    showLoadMoreButton();
    // showLoader();
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}

export function getOneCategoryProduct(e) {
  let productName = e.target.textContent;
  const btnHasClass = e.target.classList.contains('categories__btn');
  if (!btnHasClass) {
    return;
  }
  removeActiveBtn();
  e.target.classList.add('categories__btn--active');

  // Сбрасываем currentPage при смене категории
  currentPage = 1;
  refs.searchInput.value = '';

  if (productName === 'All') {
    refs.notFoundModal.classList.remove('not-found--visible');
    getProducts();
  }

  getOneCategories(productName);
}

export async function onLoadMoreClick() {
  currentPage++;

  const query = refs.searchInput.value.trim();
  const activeButton = document.querySelector('.categories__btn--active');
  const activeBtnValue = activeButton?.textContent || 'All';

  try {
    const data = await loadMoreData(query, activeBtnValue, currentPage);

    const products = data.products || data;
    renderProductsLoadMore(products);

    updateLoadMoreButton(data, products);
  } catch (error) {
    console.error('Error loading more products:', error);
    showErrorToast('Failed to load more products');
  } finally {
    hideLoader();
  }
}

// Вспомогательная функция для определения типа загрузки
async function loadMoreData(query, category, page) {
  if (query) {
    // If there is a search query, always search (ignores category)
    return await searchProductsLoadMore(query, page);
  } else if (category === 'All') {
    // No search, all products
    return await requestProducts(page);
  } else {
    // No search, specific category
    return await requestProductsLoadMore(category, page);
  }
}

// Вспомогательная функция для управления кнопкой Load More
function updateLoadMoreButton(data, products) {
  if (data.skip !== undefined && data.total !== undefined) {
    const totalLoaded = data.skip + products.length;
    if (totalLoaded >= data.total) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  }
}
