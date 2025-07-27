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
