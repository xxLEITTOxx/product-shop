import { getCategories, getOneCategories } from './js/handlers';
import { refs } from './js/refs';

//Логіка сторінки Home
getCategories();

refs.categoryList.addEventListener('click', e => {
  const productName = e.target.elements;
  console.log(productName);
  getOneCategories(productName);
  //   renderOneCategory();
});
