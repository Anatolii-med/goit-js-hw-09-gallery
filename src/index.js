import './sass/main.scss';

const galleryItems = [
  {
    preview: './images/1.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

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
