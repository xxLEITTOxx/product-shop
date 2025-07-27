import { getCategories, getProducts, onProductClick } from './js/handlers';
import { refs } from './js/refs';
import './js/theme-toggle';

//Логіка сторінки Home
getCategories();
getProducts();

if (refs.productList) {
  refs.productList.addEventListener('click', onProductClick);
}
