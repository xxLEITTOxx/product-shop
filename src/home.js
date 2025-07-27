import {
  getCategories,
  getProducts,
  onProductClick,
  handleSearchSubmit,
  handleClearSearch,
} from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
getCategories();

refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
getProducts();

if (refs.productList) {
  refs.productList.addEventListener('click', onProductClick);
}
