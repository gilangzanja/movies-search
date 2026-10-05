const API_KEY = 'c4a7a9dd';
const BASE_URL = 'https://www.omdbapi.com';

const MOVIE_URL = new URL('./data/movies.json', import.meta.url);

export const searchMovies = async (keyword, signal) => {
  const params = new URLSearchParams({ apikey: API_KEY, s: keyword });
  const url = `${BASE_URL}?${params}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Gagal mengambil data dari API');
  }

  const data = await response.json();
  if (data.Response === 'False') {
    if (data.Error?.toLowerCase().includes('not found')) {
      return [];
    }

    throw new Error(data.Error || 'Pencarian film gagal');
  }

  return (data.Search || []).map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }));
};

export const getMovieDetail = async (imdbId) => {
  const params = new URLSearchParams({ apikey: API_KEY, i: imdbId });
  const url = `${BASE_URL}?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Gagal mengambil data film');
  }

  const data = await response.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Gagal mengambil detail film');
  }

  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster,
    genre: data.Genre,
    description: data.Plot
  };
};

export const getMovies = async () => {
  const response = await fetch(MOVIE_URL);

  if (!response.ok) {
    throw new Error('Gagal mendapatkan data film');
  }

  const movies = await response.json();
  return movies;
};
