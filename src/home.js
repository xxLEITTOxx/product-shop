import {
  getCategories,
  getProducts,
  onProductClick,
  handleSearchSubmit,
  handleClearSearch,
  onModalActionsClick,
} from './js/handlers';
import { refs } from './js/refs';
import './js/theme-toggle';
import { updateCounters } from './js/helpers';

//Логіка сторінки Home
updateCounters();
getCategories();

refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
getProducts();

if (refs.productList) {
  refs.productList.addEventListener('click', onProductClick);
}
if (refs.modalActions) {
  refs.modalActions.addEventListener('click', onModalActionsClick);
}
