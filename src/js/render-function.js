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

export function renderProductsWithPagination(products, itemsPerPage) {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  let currentPage = 1;

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    refs.productsList.innerHTML = '';
    pageItems.forEach(product => {
      const li = document.createElement('li');
      li.classList.add('products__item');
      li.textContent = product.title;
      refs.productsList.appendChild(li);
    });

    renderPaginationControls(totalPages, page);
  }

  function renderPaginationControls(total, current) {
    const paginationContainer = refs.pagination;
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('pagination__btn');
      if (i === current) btn.classList.add('active');

      btn.addEventListener('click', () => {
        currentPage = i;
        renderPage(currentPage);
      });

      paginationContainer.appendChild(btn);
    }
  }

  renderPage(currentPage); // ✅ тільки тут
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
    </div>
  `;

  const actionsMarkup = `
    <button class="modal-product__btn modal-product__btn--cart" data-id="${id}">Add to cart</button>
    <button class="modal-product__btn modal-product__btn--wishlist" data-id="${id}">Add to wishlist</button>
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
  refs.productsList.innerHTML = markup; // ✅ виправлено
}
