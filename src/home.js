import {
  getCategories,
  getProducts,
  onProductClick,
  handleSearchSubmit,
  handleClearSearch,
  onModalActionsClick,
  getOneCategoryProduct,
  onLoadMoreClick,
} from './js/handlers';
import { refs } from './js/refs';
import './js/theme-toggle';
import { updateCounters, handleScroll, scrollToTop } from './js/helpers';

// handleClearSearch();

//Логіка сторінки Home
updateCounters();
getCategories();

refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
getProducts();

refs.categoryList.addEventListener('click', getOneCategoryProduct);

if (refs.productList) {
  refs.productList.addEventListener('click', onProductClick);
}
if (refs.modalActions) {
  refs.modalActions.addEventListener('click', onModalActionsClick);
}
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

if (refs.scrollUpBtn) {
  window.addEventListener('scroll', handleScroll);
  refs.scrollUpBtn.addEventListener('click', scrollToTop);
}
