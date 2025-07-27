import { refs } from './refs';
import { STORAGE_KEYS } from './constants';

export function activeFirstBtn() {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
}


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 1000,
  });
}

export const saveToStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
    // Відправляємо кастомну подію, щоб інші частини застосунку могли реагувати на зміни
    document.dispatchEvent(
      new CustomEvent('storageUpdated', { detail: { key, value } })
    );
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const loadFromStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export function isProductInStorage(key, id) {
  const items = loadFromStorage(key) || [];
  return items.includes(id);
}

export function addToStorage(key, id) {
  const items = loadFromStorage(key) || [];
  items.push(id);
  saveToStorage(key, items);
  updateCounters();
}

export function removeFromStorage(key, id) {
  const items = loadFromStorage(key) || [];
  const index = items.indexOf(id);
  if (index !== -1) {
    items.splice(index, 1);
  }
  saveToStorage(key, items);
  updateCounters();
}

export const updateCounters = () => {
  const cart = loadFromStorage(STORAGE_KEYS.CART) || [];
  const wishlist = loadFromStorage(STORAGE_KEYS.WISHLIST) || [];

  // Оновлюємо лічильники тільки в хедері
  if (refs.cartCount) {
    refs.cartCount.textContent = cart.length;
  }
  if (refs.wishlistCount) {
    refs.wishlistCount.textContent = wishlist.length;
  }
};

