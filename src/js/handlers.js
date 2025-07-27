import { activeFirstBtn, removeActiveBtn } from './helpers';

import {
  fetchByCategory,
  requestProducts,
  fetchCategories,
} from './products-api';

import { renderCategories, renderProducts } from './render-function';
import { refs } from './refs';

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
