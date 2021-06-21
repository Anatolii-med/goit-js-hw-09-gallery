import { galleryItems } from './images';

// - Создание и рендер разметки по массиву данных `galleryItems` из `app.js` и
// предоставленному шаблону.

const galeryEl = document.querySelector('.gallery');

const createGalleryElements = galleryItems.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
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
});

galeryEl.insertAdjacentHTML('beforeend', createGalleryElements.join(''));

// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
// изображения.

// - Открытие модального окна по клику на элементе галереи.
const modalWindow = document.querySelector('div.lightbox');

const showModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  return modalWindow.classList.add('is-open');
};

galeryEl.addEventListener('click', showModal);
// - Подмена значения атрибута`src` элемента`img.lightbox__image`.

const originalImage = document.querySelector('.lightbox__image');

const showModalImage = event => {
  event.preventDefault();
  if (modalWindow.classList.contains('is-open') && event.target.nodeName === 'IMG') {
    const imgSetSrc = event.target.dataset.source;
    return (originalImage.src = imgSetSrc);
  }
};

galeryEl.addEventListener('click', showModalImage);

// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.
const closeBtn = document.querySelector('.lightbox__button');

const onCloseBtnClick = () => {
  if (modalWindow.classList.contains('is-open')) {
    originalImage.src = '';
    return modalWindow.classList.remove('is-open');
  }
};
closeBtn.addEventListener('click', onCloseBtnClick);

const overlayClickCloseModalEl = document.querySelector('div.lightbox__overlay');
overlayClickCloseModalEl.addEventListener('click', onCloseBtnClick);

//

const closeModalEscKeyboard = function (event) {
  if (event.key === 'Escape') {
    originalImage.src = '';
    return modalWindow.classList.remove('is-open');
  }
};

window.addEventListener('keydown', closeModalEscKeyboard);
