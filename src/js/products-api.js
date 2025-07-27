import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchCategories() {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function fetchByCategory(product) {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_CATEGORY}${product}`);
  return data;
}
