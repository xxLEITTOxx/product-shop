import { getCategories } from './js/handlers';

//Логіка сторінки Home
getCategories();

import { handleSearchSubmit, handleClearSearch } from './js/handlers.js';
import { refs } from './js/refs.js';

refs.searchForm.addEventListener('submit', handleSearchSubmit);
refs.clearSearchBtn.addEventListener('click', handleClearSearch);
