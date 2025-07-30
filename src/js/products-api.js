import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';
import { showLoader } from './helpers';

axios.defaults.baseURL = BASE_URL;

export async function fetchCategories() {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function fetchByCategory(product) {
  await showLoader();
  const { data } = await axios(
    `${ENDPOINTS.PRODUCTS_BY_CATEGORY}${product}?limit=12`
  );
  return data;
}

export async function searchProducts(query) {
  const { data } = await axios(`${ENDPOINTS.SEARCH}?limit=12&q=${query}`);

  return data;
}

export async function searchProductsLoadMore(query, currentPage) {
  const skip = (currentPage - 1) * 12;
  const { data } = await axios(
    `${ENDPOINTS.SEARCH}?limit=12&q=${query}&skip=${skip}`
  );
  return data;
}

export async function fetchProducts() {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS}?limit=12`);
  return data.products;
}

export async function requestProducts(currentPage) {
  await showLoader();
  const skip = (currentPage - 1) * 12;
  const myUrl = `${ENDPOINTS.PRODUCTS}?limit=12&skip=${skip}`;
  const data = await axios(myUrl);

  return data.data.products;
}

export async function requestProductsLoadMore(product, currentPage) {
  await showLoader();
  const skip = (currentPage - 1) * 12;
  const myUrl = `${ENDPOINTS.PRODUCTS_BY_CATEGORY}${product}?limit=12&skip=${skip}`;
  const data = await axios(myUrl);

  return data.data;
}

export async function requestProductById(id) {
  const { data } = await axios(`${ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}
