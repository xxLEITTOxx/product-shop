import { refs } from './refs';
import { isProductInStorage } from './helpers';
import { STORAGE_KEYS } from './constants';

export function renderCategories(data) {
  const markup = data
    .map(
      el => `<li class="categories__item">
        <button class="categories__btn" type="button">${el}</button>
      </li>`
    )
    .join('');

  refs.categoryList.innerHTML = markup;
}

export function renderModalProduct(product) {
  const {
    id,
    thumbnail,
    title,
    price,
    description,
    shippingInformation = 'Not specified',
    returnPolicy = 'Not specified',
  } = product;

  const productInfoMarkup = `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
    <div class="modal-product__content">
      <h2 class="modal-product__title">${title}</h2>
      <div class="modal-product__details">
        <p class="modal-product__price">Price: $${price}</p>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information"><b>Shipping:</b> ${shippingInformation}</p>
        <p class="modal-product__return-policy"><b>Return Policy:</b> ${returnPolicy}</p>
      </div>
    </div> `;

  const inCart = isProductInStorage(STORAGE_KEYS.CART, String(id));
  const inWishlist = isProductInStorage(STORAGE_KEYS.WISHLIST, String(id));

  const cartBtnText = inCart ? 'Remove from Cart' : 'Add to Cart';
  const wishlistBtnText = inWishlist
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  const actionsMarkup = `
    <button class="modal-product__btn modal-product__btn--cart" data-id="${id}">${cartBtnText}</button>
    <button class="modal-product__btn modal-product__btn--wishlist" data-id="${id}">${wishlistBtnText}</button>
  `;

  refs.modalProduct.innerHTML = productInfoMarkup;
  refs.modalActions.innerHTML = actionsMarkup;
}

export function productsMarkup(product) {
  return `
    <li class="products__item" data-id="${product.id}">
      <img class="products__image" src="${product.thumbnail}" alt="${product.title}" />
      <p class="products__title">${product.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
      <p class="products__category">Category: ${product.category}</p>
      <p class="products__price">Price: $${product.price}</p>
    </li>
  `;
}

export function renderProducts(productArray) {
  const markup = productArray.map(productsMarkup).join('');

  //refs.productsList.innerHTML = markup; // ✅ виправлено
  refs.productList.insertAdjacentHTML('beforeend', markup);
}

export function clearProducts() {
  if (refs.productList) {
    refs.productList.innerHTML = '';
  }
}
