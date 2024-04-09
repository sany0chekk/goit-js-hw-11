'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getImages from './pixabay-api';

const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export default function checkImage(event) {
  event.preventDefault();

  if (!event.target.search.value.trim()) {
    return iziToast.warning({
      message: 'The field cannot be empty!',
      position: 'topRight',
    });
  }

  loader.classList.remove('is-hidden');
  loader.classList.add('is-active');

  galleryEl.innerHTML = '';

  setTimeout(() => {
    getImages(event.target.search.value)
      .then(data => {
        event.target.search.value = '';

        if (data.totalHits === 0) {
          return iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please, try again!',
            position: 'topRight',
          });
        }

        renderImages(data.hits);
        lightbox.refresh();
      })
      .catch(error => console.log(error))
      .finally(() => {
        loader.classList.remove('is-active');
        loader.classList.add('is-hidden');
      });
  }, 500);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function renderImages(array) {
  const createImages = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-item-link">
          <img src="${webformatURL}" alt="${tags}" class="gallery-item-img" />
          <div class="gallery-item-content">
            <p class="gallery-item-descr">Likes<span>${likes}</span></p>
            <p class="gallery-item-descr">Views<span>${views}</span></p>
            <p class="gallery-item-descr">Comments<span>${comments}</span></p>
            <p class="gallery-item-descr">Donwloads<span>${downloads}</span></p>
          </div>
        </a>
      </li>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', createImages);
}
