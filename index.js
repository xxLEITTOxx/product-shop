import"./assets/styles-A3fMYwrd.js";import{a as s}from"./assets/vendor-N5iQpiFS.js";function b(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}const k="https://dummyjson.com/",a={CATEGORIES:"products/category-list",PRODUCTS:"products",PRODUCT_BY_ID:"products/",SEARCH:"products/search",PRODUCTS_BY_CATEGORY:"products/category/"};s.defaults.baseURL=k;async function w(){const{data:t}=await s(`${a.CATEGORIES}`);return t}async function v(t){const e=(t-1)*12,n=`${a.PRODUCTS}?limit=12&skip=${e}`;return(await s(n)).data.products}async function T(t){const{data:e}=await s(`${a.PRODUCT_BY_ID}${t}`);return e}const o={categoryList:document.querySelector(".categories"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),modalCloseBtn:document.querySelector(".modal__close-btn"),modalActions:document.querySelector(".modal-product__actions"),productList:document.querySelector(".products"),themeToggleBtn:document.querySelector(".theme-toggle-btn")};function $(t){const e=t.map(n=>`<li class="categories__item">
   <button class="categories__btn" type="button">${n}</button>
 </li>`).join("");o.categoryList.innerHTML=e}function L(t){const{id:e,thumbnail:n,title:c,price:p,description:_,shippingInformation:g="Not specified",returnPolicy:y="Not specified"}=t,h=`
    <img class="modal-product__img" src="${n}" alt="${c}" />
      <div class="modal-product__content">
        <h2 class="modal-product__title">${c}</h2>
        <div class="modal-product__details">
            <p class="modal-product__price">Price: $${p}</p>
            <p class="modal-product__description">${_}</p>
            <p class="modal-product__shipping-information"><b>Shipping:</b> ${g}</p>
            <p class="modal-product__return-policy"><b>Return Policy:</b> ${y}</p>
        </div>
      </div>
  `,f=`
    <button class="modal-product__btn modal-product__btn--cart" data-id="${e}">Add to cart</button>
    <button class="modal-product__btn modal-product__btn--wishlist" data-id="${e}">Add to wishlist</button>
  `;o.modalProduct.innerHTML=h,o.modalActions.innerHTML=f}function x(t){return`
    <li class="products__item" data-id="${t.id}">
      <img class="products__image" src="${t.thumbnail}" alt="${t.title}" />
      <p class="products__title">${t.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${t.brand}</p>
      <p class="products__category">Category: ${t.category}</p>
      <p class="products__price">Price: $${t.price}</p>
    </li>
  `}function C(t){const e=t.map(x).join("");o.productList.innerHTML=e}function l(t){t.code==="Escape"&&d()}function u(t){t.currentTarget===t.target&&d()}function P(){o.modal&&(o.modal.classList.add("modal--is-open"),document.body.style.overflow="hidden",document.addEventListener("keydown",l),o.modal.addEventListener("click",u))}function d(){o.modal&&(o.modal.classList.remove("modal--is-open"),document.body.style.overflow="auto",document.removeEventListener("keydown",l),o.modal.removeEventListener("click",u))}o.modalCloseBtn&&o.modalCloseBtn.addEventListener("click",d);let S=1;async function B(){try{const t=await w();$(["All",...t]),b()}catch(t){console.log(t)}}async function E(t){const e=t.target.closest(".products__item");if(!e)return;const{id:n}=e.dataset;try{const c=await T(n);L(c),P()}catch(c){console.log(c)}}async function M(){try{const t=await v(S);C(t)}catch(t){console.log(t)}}const m=document.body,r=o.themeToggleBtn,A=`
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
`,I=`
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
`;function i(t){m.setAttribute("data-theme",t),localStorage.setItem("theme",t),R(t)}function R(t){r&&(r.innerHTML=t==="dark"?A:I)}function q(){const e=m.getAttribute("data-theme")==="dark"?"light":"dark";i(e)}function D(){const t=localStorage.getItem("theme"),e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;i(t||(e?"dark":"light"))}r&&r.addEventListener("click",q);D();B();M();o.productList&&o.productList.addEventListener("click",E);
//# sourceMappingURL=index.js.map
