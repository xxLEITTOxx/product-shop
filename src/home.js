import {
  getCategories,
  getProducts,
  onProductClick,
  handleSearchSubmit,
  handleClearSearch,
} from './js/handlers';
import { refs } from './js/refs';
import './js/theme-toggle';

//Логіка сторінки Home
getCategories();

refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
getProducts();

if (refs.productList) {
  refs.productList.addEventListener('click', onProductClick);
}
