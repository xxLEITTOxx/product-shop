import { activeFirstBtn } from './helpers';
import { fetchByCategory, fetchCategories } from './products-api';
import { renderCategories } from './render-function';

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    console.log(error);
  }
}

export async function getOneCategories() {
  try {
    const data = await fetchByCategory();
    console.log(data);
    // renderOneCategory(data);
  } catch (error) {
    console.log(error);
  }
}
