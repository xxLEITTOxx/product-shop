export function activeFirstBtn() {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
}

export function removeActiveBtn() {
  const activeBtn = document.querySelector('.categories__btn--active');

  activeBtn.classList.remove('categories__btn--active');
}
