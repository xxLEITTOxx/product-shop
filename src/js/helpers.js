export function activeFirstBtn() {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
}

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 3000,
  });
}
