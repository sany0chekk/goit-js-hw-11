'use strict';

export default function getImages(searchWord) {
  const searchList = new URLSearchParams({
    key: '43306463-04f5e758a9e005b63fe743cb3',
    q: searchWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchList}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
