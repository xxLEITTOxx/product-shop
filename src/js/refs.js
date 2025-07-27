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
};
