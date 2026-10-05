import { getMovieDetail, searchMovies } from './api.js';
import { debounce } from './utils.js';
import { renderMovies } from './ui.js';
import { openModal, closeModal } from './modal.js';

const searchInput = document.querySelector('#searchInput');
const movieList = document.querySelector('#movieList');
const message = document.querySelector('#message');
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modalBody');
const modalCloseButton = document.querySelector('#classModal');
const loading = document.querySelector('#loading');

let movies = [];
let searchController;

const handleSearch = async () => {
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword) {
    searchController?.abort();
    searchController = undefined;
    movies = [];

    movieList.innerHTML = '';
    hideLoading();

    message.textContent = 'Ketik judul film untuk mencari';

    return;
  }

  searchController?.abort();
  const controller = new AbortController();
  searchController = controller;

  movies = [];

  try {
    showLoading();

    message.textContent = '';

    movieList.innerHTML = '';

    const results = await searchMovies(keyword, controller.signal);
    if (controller.signal.aborted) {
      return;
    }

    movies = results;

    renderMovies(movies, movieList);
    message.textContent = movies.length === 0 ? 'Film tidak ditemukan' : '';
  } catch (error) {
    if (error.name === 'AbortError') {
      return;
    }

    console.error(error);

    movieList.innerHTML = '';

    message.textContent = error.message;
  } finally {
    if (searchController === controller) {
      hideLoading();
      searchController = undefined;
    }
  }
};

movieList.addEventListener('click', (event) => {
  const movieCard = event.target.closest('.movie-card');

  if (!movieCard) {
    return;
  }

  const movieId = movieCard.dataset.id;

  const selectedMovie = movies.find((movie) => {
    return movie.id === movieId;
  });

  if (!selectedMovie) {
    return;
  }

  getMovieDetail(movieId)
    .then((movie) => openModal(movie, modal, modalBody))
    .catch((error) => {
      console.error(error);
      message.textContent = error.message;
    });
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal(modal);
  }
});

modalCloseButton.addEventListener('click', () => {
  closeModal(modal);
});

const showLoading = () => {
  loading.classList.remove('hidden');
};

const hideLoading = () => {
  loading.classList.add('hidden');
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(modal);
  }
});
const debounceSearch = debounce(handleSearch, 500);

searchInput.addEventListener('input', debounceSearch);
