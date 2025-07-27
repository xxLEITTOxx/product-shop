export const refs = {
  categoryList: document.querySelector('.categories'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  clearSearchBtn: document.querySelector('.search-form__btn-clear'),
  loader: document.querySelector('.loader'),
  productsList: document.querySelector('.products'),
  get notFound() {
    return document.querySelector('.not-found');
  },
  pagination: document.querySelector('.pagination'),

  // --- Модальне окно ---
  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  modalActions: document.querySelector('.modal-product__actions'),
  productList: document.querySelector('.products'),
  themeToggleBtn: document.querySelector('.theme-toggle-btn'),

  // --- Хедер Cart and Wishlist ---
  wishlistCount: document.querySelector('[data-wishlist-count]'),
  cartCount: document.querySelector('[data-cart-count]'),

  // --- Сторінка Cart ---
  cartTotalItems: document.querySelector('[data-count]'),
  cartTotalPrice: document.querySelector('[data-price]'),
  cartBuyBtn: document.querySelector('.cart-summary__btn'),
};
