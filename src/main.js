import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import './css/styles.css';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const galleryContainer = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.currentTarget['search-text'].value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreButton();

  await fetchAndDisplayImages();
});

loadMoreBtn.addEventListener('click', async () => {
  const nextPage = currentPage + 1;
  hideLoadMoreButton();
  await fetchAndDisplayImages(nextPage);
});

async function fetchAndDisplayImages(page = currentPage) {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      if (page === 1) {
        iziToast.warning({
          title: 'No results',
          message: `No images found for "${currentQuery}".`,
          position: 'topRight',
        });
      }
      hideLoadMoreButton();
      hideLoader();
      return;
    }

    totalHits = data.totalHits;

    if (page === 1) {
      createGallery(data.hits);
      iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images.`,
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      smoothScroll();
    }

    currentPage = page;

    const totalPages = Math.ceil(totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    hideLoader();
  } catch (error) {
    hideLoader();
    if (galleryContainer.children.length > 0) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  }
}

function smoothScroll() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  const cardHeight = galleryItems[0].getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
