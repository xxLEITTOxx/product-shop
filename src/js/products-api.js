import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchCategories() {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
}

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function searchProducts(query) {
  const { data } = await axios(`${ENDPOINTS.SEARCH}?q=${query}`);
  return data.products;
}

export async function fetchProducts() {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS}`);
  return data.products;
}
export async function requestProducts(currentPage) {
  const skip = (currentPage - 1) * 12;
  const myUrl = `${ENDPOINTS.PRODUCTS}?limit=12&skip=${skip}`;
  const data = await axios(myUrl);

  return data.data.products;
}

export async function requestProductById(id) {
  const { data } = await axios(`${ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}
