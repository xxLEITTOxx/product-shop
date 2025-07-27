import"./assets/styles-JE8YjOlG.js";import{a}from"./assets/vendor-N5iQpiFS.js";function e(){const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")}const n="https://dummyjson.com/",r={CATEGORIES:"products/category-list",PRODUCTS:"products",PRODUCT_BY_ID:"products/",SEARCH:"products/search",PRODUCTS_BY_CATEGORY:"products/category/"},o={categoryList:document.querySelector(".categories"),productList:document.querySelector(".products")};a.defaults.baseURL=n;async function i(){const{data:t}=await a(`${r.CATEGORIES}`);return t}async function u(t){const s=(t-1)*12,c=`${r.PRODUCTS}?limit=12&skip=${s}`;return(await a(c)).data.products}function d(t){const s=t.map(c=>`<li class="categories__item">
   <button class="categories__btn" type="button">${c}</button>
 </li>`).join("");o.categoryList.innerHTML=s}function l(t){return`
    <li class="products__item" data-id="${t.id}">
      <img class="products__image" src="${t.thumbnail}" alt="${t.title}" />
      <p class="products__title">${t.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${t.brand}</p>
      <p class="products__category">Category: ${t.category}</p>
      <p class="products__price">Price: $${t.price}</p>
    </li>
  `}function p(t){const s=t.map(l).join("");o.productList.innerHTML=s}let _=1;async function g(){try{const t=await i();d(["All",...t]),e()}catch(t){console.log(t)}}async function m(){try{const t=await u(_);p(t)}catch(t){console.log(t)}}g();m();
//# sourceMappingURL=index.js.map
