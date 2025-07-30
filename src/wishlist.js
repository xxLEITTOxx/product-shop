import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { STORAGE_KEYS } from './js/constants.js';
import { refs } from './js/refs.js';
import {
  loadFromStorage,
  updateCounters,
  handleScroll,
  scrollToTop,
} from './js/helpers.js';
import { onModalActionsClick, onProductClick } from './js/handlers.js';
import { requestProductById } from './js/products-api.js';
import { renderProducts, clearProducts } from './js/render-function.js';
import './js/theme-toggle';

/**
 * Завантажує та відображає товари зі списку бажань.
 */
async function loadWishlistProducts() {
  const wishlistIds = loadFromStorage(STORAGE_KEYS.WISHLIST) || [];
  clearProducts();

  if (wishlistIds.length === 0) {
    if (refs.productList) {
      refs.productList.innerHTML =
        '<li class="wishlist-empty-message">Your wishlist is empty.</li>';
    }
    return;
  }

  try {
    const productPromises = wishlistIds.map(id => requestProductById(id));
    const products = await Promise.all(productPromises);
    renderProducts(products);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load wishlist products.',
    });
  }
}

/**
 * Обробник кастомної події оновлення localStorage.
 * @param {CustomEvent} event
 */
function handleStorageUpdate(event) {
  if (event.detail.key === STORAGE_KEYS.WISHLIST) {
    loadWishlistProducts();
  }
}

/**
 * Ініціалізація сторінки списку бажань.
 */
function initializeWishlistPage() {
  updateCounters();
  loadWishlistProducts();

  if (refs.productList) {
    refs.productList.addEventListener('click', onProductClick);
  }
  if (refs.modalActions) {
    refs.modalActions.addEventListener('click', onModalActionsClick);
  }
  document.addEventListener('storageUpdated', handleStorageUpdate);
  if (refs.scrollUpBtn) {
    window.addEventListener('scroll', handleScroll);
    refs.scrollUpBtn.addEventListener('click', scrollToTop);
  }
}

document.addEventListener('DOMContentLoaded', initializeWishlistPage);
