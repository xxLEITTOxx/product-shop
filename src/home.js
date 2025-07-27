import {
  getCategories,
  getProducts,
  getOneCategoryProduct,
} from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
getCategories();
getProducts();

refs.categoryList.addEventListener('click', getOneCategoryProduct);
