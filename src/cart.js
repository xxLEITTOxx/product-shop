//Логіка сторінки Cart
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { STORAGE_KEYS } from './js/constants.js';
import { refs } from './js/refs.js';
import { loadFromStorage, saveToStorage, updateCounters } from './js/helpers';
import { onModalActionsClick, onProductClick } from './js/handlers';
import { requestProductById } from './js/products-api.js';
import { renderProducts, clearProducts } from './js/render-function.js';
import './js/theme-toggle';

/**
 * Оновлює блок "Order Summary" на сторінці кошика.
 */
function updateCartSummary(itemsCount, total) {
  // Ніяких змін тут не потрібно, оскільки refs.js тепер надає правильні посилання
  if (refs.cartTotalItems) {
    refs.cartTotalItems.textContent = itemsCount;
  }
  if (refs.cartTotalPrice) {
    refs.cartTotalPrice.textContent = `$${total.toFixed(2)}`;
  }
}

/**
 * Завантажує та відображає товари з кошика.
 */
async function loadCartProducts() {
  const cartIds = loadFromStorage(STORAGE_KEYS.CART) || [];
  clearProducts();

  if (cartIds.length === 0) {
    if (refs.productList) {
      refs.productList.innerHTML =
        '<li class="cart-empty-message">Your cart is empty.</li>';
    }
    updateCartSummary(0, 0); // Оновлюємо суму, якщо кошик порожній
    return;
  }

  try {
    const productPromises = cartIds.map(id => requestProductById(id));
    const products = await Promise.all(productPromises);
    renderProducts(products);

    const totalItems = products.length;
    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    updateCartSummary(totalItems, totalPrice); // Оновлюємо суму після завантаження товарів
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load cart products.',
    });
    updateCartSummary(0, 0); // У разі помилки скидаємо суму
  }
}

/**
 * Обробник для кнопки "Купити".
 */
function onBuyBtnClick() {
  const cartIds = loadFromStorage(STORAGE_KEYS.CART) || [];
  if (cartIds.length > 0) {
    iziToast.success({
      title: 'Success',
      message: 'Products purchased successfully!',
      position: 'topRight',
    });
    saveToStorage(STORAGE_KEYS.CART, []);
    loadCartProducts(); // Перезавантажуємо кошик (він стане порожнім)
    updateCounters(); // Оновлюємо лічильник у хедері
  } else {
    iziToast.info({
      title: 'Info',
      message: 'Your cart is empty.',
      position: 'topRight',
    });
  }
}

/**
 * Обробник кастомної події оновлення localStorage.
 * @param {CustomEvent} event
 */
function handleStorageUpdate(event) {
  // Перевіряємо, чи оновився саме кошик
  if (event.detail.key === STORAGE_KEYS.CART) {
    // Якщо так, перезавантажуємо список товарів на сторінці
    loadCartProducts();
  }
}

/**
 * Ініціалізація сторінки кошика.
 */
function initializeCartPage() {
  updateCounters();
  loadCartProducts();

  if (refs.productList) {
    refs.productList.addEventListener('click', onProductClick);
  }
  if (refs.modalActions) {
    refs.modalActions.addEventListener('click', onModalActionsClick);
  }
  if (refs.cartBuyBtn) refs.cartBuyBtn.addEventListener('click', onBuyBtnClick);
  if (refs.scrollUpBtn) {
    window.addEventListener('scroll', handleScroll);
    refs.scrollUpBtn.addEventListener('click', scrollToTop);
  }
  document.addEventListener('storageUpdated', handleStorageUpdate);
}

document.addEventListener('DOMContentLoaded', initializeCartPage);
