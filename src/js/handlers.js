import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {  
  showErrorToast,
  activeFirstBtn,
  addToStorage,
  isProductInStorage,
  removeFromStorage,
  removeActiveBtn,
} from './helpers';

import { STORAGE_KEYS } from './constants';


import {
  fetchByCategory,
  requestProducts,
  fetchCategories,
  requestProductById,
  searchProducts,
  fetchProducts,
} from './products-api.js';

import {
  renderCategories,
  renderProducts,
  renderModalProduct,
} from './render-function';

import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { STORAGE_KEYS } from './constants';


import { openModal } from './modal.js';
import { refs } from './refs.js';

let currentPage = 1;

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    console.log(error);
  }
}

export async function getOneCategories(product) {
  try {
    const data = await fetchByCategory(product);
    renderProducts(data.products);
    if (data.products.length === 0 && product !== 'All') {
      refs.notFoundModal.classList.add('not-found--visible');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = refs.searchInput.value.trim();

  if (!query) {
    showErrorToast('Please enter a search term');
    return;
  }

  // Безопасная работа с loader - проверяем его наличие
  if (refs.loader) {
    refs.loader.classList.add('visible');
  }

  try {
    const products = await searchProducts(query);

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
    renderProducts(products);

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
  try {
    const data = await requestProducts(currentPage);
    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
}

export function getOneCategoryProduct(e) {
  const productName = e.target.textContent;
  const btnHasClass = e.target.classList.contains('categories__btn');
  if (!btnHasClass) {
    return;
  }
  removeActiveBtn();
  e.target.classList.add('categories__btn--active');

  if (productName === 'All') {
    refs.notFoundModal.classList.remove('not-found--visible');
    getProducts();
  }

  getOneCategories(productName);
}
