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
