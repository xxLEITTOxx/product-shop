import { refs } from './refs';

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
  const productInfoMarkup = `
    <img class="modal-product__image" src="${product.thumbnail}" alt="${product.title}" />
    <div class="modal-product__info">
        <h2 class="modal-product__title">${product.title}</h2>
        <p class="modal-product__desc">${product.description}</p>
        <p><strong>Rating:</strong> ${product.rating} / 5</p>
        <p class="modal-product__price">Price: $${product.price}</p>
    </div>
  `;
  const actionsMarkup = `
    <button class="modal-product__btn" data-id="${product.id}">Add to cart</button>
    <button class="modal-product__btn" data-id="${product.id}">Add to wishlist</button>
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

export function renderProducts(product) {
  const markup = product.map(productsMarkup).join('');
  refs.productList.innerHTML = markup;
}
