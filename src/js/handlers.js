import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  activeFirstBtn,
  addToStorage,
  isProductInStorage,
  removeFromStorage,
} from './helpers';
import { STORAGE_KEYS } from './constants';
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
