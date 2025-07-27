import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';
import { refs } from './refs';

axios.defaults.baseURL = BASE_URL;

export async function fetchCategories() {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function requestProducts(currentPage) {
  const skip = (currentPage - 1) * 12;
  const myUrl = `${ENDPOINTS.PRODUCTS}?limit=12&skip=${skip}`;
  const data = await axios(myUrl);

  return data.data.products;
}
