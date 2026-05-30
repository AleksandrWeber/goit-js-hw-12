import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderEl = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more-btn');

if (SimpleLightbox && SimpleLightbox.prototype && !SimpleLightbox.prototype._patchedRefresh) {
  const originalRefresh = SimpleLightbox.prototype.refresh;

  SimpleLightbox.prototype.refresh = function () {
    if (!this.initialSelector) {
      throw 'refreshing only works when you initialize using a selector!';
    }

    const options = this.options;
    const selector = this.initialSelector;

    this.destroy();
    const refreshed = new this.constructor(selector, options);
    refreshed._patchedRefresh = true;
    return refreshed;
  };

  SimpleLightbox.prototype._patchedRefresh = true;
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

export function createGallery(images) {
  if (!images.length) return;

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          src="${image.webformatURL}"
          alt="${image.tags}"
          loading="lazy"
        />
      </a>
      <div class="gallery-info">
        <p class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${image.likes}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${image.views}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${image.comments}</span>
        </p>
        <p class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${image.downloads}</span>
        </p>
      </div>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox = lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('loader-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('loader-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('load-more-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('load-more-hidden');
}
