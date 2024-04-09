'use strict';
import checkImage from './js/render-fuctions';

const searchForm = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');

searchForm.addEventListener('submit', checkImage);
