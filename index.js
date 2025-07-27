import"./assets/styles-JE8YjOlG.js";import{a as s}from"./assets/vendor-N5iQpiFS.js";function f(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}const g="https://dummyjson.com/",r={CATEGORIES:"products/category-list",PRODUCTS:"products",PRODUCT_BY_ID:"products/",SEARCH:"products/search",PRODUCTS_BY_CATEGORY:"products/category/"};s.defaults.baseURL=g;async function b(){const{data:t}=await s(`${r.CATEGORIES}`);return t}async function $(t){const c=(t-1)*12,e=`${r.PRODUCTS}?limit=12&skip=${c}`;return(await s(e)).data.products}async function L(t){const{data:c}=await s(`${r.PRODUCT_BY_ID}${t}`);return c}const o={categoryList:document.querySelector(".categories"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),modalCloseBtn:document.querySelector(".modal__close-btn"),modalActions:document.querySelector(".modal-product__actions"),productList:document.querySelector(".products")};function P(t){const c=t.map(e=>`<li class="categories__item">
   <button class="categories__btn" type="button">${e}</button>
 </li>`).join("");o.categoryList.innerHTML=c}function C(t){const{id:c,thumbnail:e,title:a,price:l,description:u,shippingInformation:p="Not specified",returnPolicy:m="Not specified"}=t,_=`
    <img class="modal-product__img" src="${e}" alt="${a}" />
      <div class="modal-product__content">
        <h2 class="modal-product__title">${a}</h2>
        <div class="modal-product__details">
            <p class="modal-product__price">Price: $${l}</p>
            <p class="modal-product__description">${u}</p>
            <p class="modal-product__shipping-information"><b>Shipping:</b> ${p}</p>
            <p class="modal-product__return-policy"><b>Return Policy:</b> ${m}</p>
        </div>
      </div>
  `,y=`
    <button class="modal-product__btn modal-product__btn--cart" data-id="${c}">Add to cart</button>
    <button class="modal-product__btn modal-product__btn--wishlist" data-id="${c}">Add to wishlist</button>
  `;o.modalProduct.innerHTML=_,o.modalActions.innerHTML=y}function h(t){return`
    <li class="products__item" data-id="${t.id}">
      <img class="products__image" src="${t.thumbnail}" alt="${t.title}" />
      <p class="products__title">${t.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${t.brand}</p>
      <p class="products__category">Category: ${t.category}</p>
      <p class="products__price">Price: $${t.price}</p>
    </li>
  `}function k(t){const c=t.map(h).join("");o.productList.innerHTML=c}function d(t){t.code==="Escape"&&n()}function i(t){t.currentTarget===t.target&&n()}function v(){o.modal&&(o.modal.classList.add("modal--is-open"),document.body.style.overflow="hidden",document.addEventListener("keydown",d),o.modal.addEventListener("click",i))}function n(){o.modal&&(o.modal.classList.remove("modal--is-open"),document.body.style.overflow="auto",document.removeEventListener("keydown",d),o.modal.removeEventListener("click",i))}o.modalCloseBtn&&o.modalCloseBtn.addEventListener("click",n);let E=1;async function S(){try{const t=await b();P(["All",...t]),f()}catch(t){console.log(t)}}async function T(t){const c=t.target.closest(".products__item");if(!c)return;const{id:e}=c.dataset;try{const a=await L(e);C(a),v()}catch(a){console.log(a)}}async function w(){try{const t=await $(E);k(t)}catch(t){console.log(t)}}S();w();o.productList&&o.productList.addEventListener("click",T);
//# sourceMappingURL=index.js.map
