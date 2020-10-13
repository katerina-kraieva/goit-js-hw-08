import imagesArr from './gallery-items.js';

const imagesGallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
const modalOverlay = document.querySelector('.lightbox__overlay');

const imagesMarkup = createImageCards(imagesArr);
const UrlsArr = imagesArr.map((el) => el.original);
console.log(UrlsArr);

// создание и рендер разметки
imagesGallery.insertAdjacentHTML('beforeend', imagesMarkup);

//открытие модалки
imagesGallery.addEventListener('click', onImagesGalleryClick);

// закрытие модалки через кнопку
modalCloseBtn.addEventListener('click', modalClose);

// закрытие модалки по Esc
document.addEventListener('keydown', modalEscClose);

//зактрытие по оверлэю
modalOverlay.addEventListener('click', onModalOverlayClick);

//листаем галерею кнопками клавиатуры (содрано, разобраться)
document.addEventListener('keydown', keyboardPress);

function createImageCards(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
       <a
         class="gallery__link"
         href="${original}"
       >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
    </li>`;
    })
    .join('');
}
function onImagesGalleryClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.add('is-open');

  modalImage.src = evt.target.dataset.source;
  modalImage.alt = evt.target.alt;
}
function modalClose() {
  modal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
}
function modalEscClose(evt) {
  if (evt.key === "Escape") {
    modalClose();
  }
}
function onModalOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    modalClose();
  }
}
function keyboardPress(event) {
  if (event.key === "ArrowRight") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (modalImage.src === UrlsArr[8]) {
        modalImage.src = `${UrlsArr[0]}`;
        return;
      } else if (modalImage.src === UrlsArr[i]) {
        modalImage.src = `${UrlsArr[i + 1]}`;
        return;
      }
    }
  } else if (event.key === "ArrowLeft") {
    for (let i = 0; i < UrlsArr.length; i += 1) {
      if (modalImage.src === UrlsArr[0]) {
        modalImage.src = `${UrlsArr[8]}`;
        return;
      } else if (modalImage.src === UrlsArr[i]) {
        modalImage.src = `${UrlsArr[i - 1]}`;
        return;
      }
    }
  }
}
