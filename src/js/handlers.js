import { activeFirstBtn } from './helpers.js';
import { fetchCategories } from './products-api';
import { renderCategories } from './render-function.js';
import { activeFirstBtn } from './helpers';
import {
  fetchCategories,
  requestProducts,
  requestProductById,
} from './products-api';
import {
  renderCategories,
  renderProducts,
  renderModalProduct,
} from './render-function';
import { openModal } from './modal.js';

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

import { searchProducts } from './products-api.js';
import { renderProductsWithPagination } from './render-function.js';
import { showErrorToast } from './helpers.js';
import { refs } from './refs.js';

export async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = refs.searchInput.value.trim();

  if (!query) {
    showErrorToast('Enter product');
    return;
  }

  refs.loader.classList.add('visible');

  try {
    const products = await searchProducts(query);
    refs.loader.classList.remove('visible');
    refs.productsList.innerHTML = '';

    if (products.length === 0) {
      refs.notFound.classList.add('not-found--visible');
      return;
    }

    refs.notFound.classList.remove('not-found--visible');
    renderProductsWithPagination(products, 12);
    refs.clearSearchBtn.classList.add('visible');
  } catch (error) {
    refs.loader.classList.remove('visible');
    showErrorToast('Error');
    console.error(error);
  }
}

import { fetchProducts } from './products-api.js';

export async function handleClearSearch() {
  refs.searchInput.value = '';
  refs.clearSearchBtn.classList.remove('visible');
  refs.notFound.classList.remove('not-found--visible');
  refs.loader.classList.add('visible');

  try {
    const products = await fetchProducts();
    refs.loader.classList.remove('visible');
    refs.productsList.innerHTML = '';

    if (products.length === 0) {
      refs.notFound.classList.add('not-found--visible');
      return;
    }

    renderProductsWithPagination(products, 12);
  } catch (error) {
    refs.loader.classList.remove('visible');
    showErrorToast('Error load');
    console.error(error);
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
