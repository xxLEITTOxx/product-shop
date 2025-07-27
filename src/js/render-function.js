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

import { refs } from './refs.js';

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
      li.textContent = product.title; // або шаблон
      refs.productsList.appendChild(li);
    });

    renderPaginationControls(totalPages, page);
  }

  function renderPaginationControls(total, current) {
    const paginationContainer = document.querySelector('.pagination');
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

  renderPage(currentPage);
}
