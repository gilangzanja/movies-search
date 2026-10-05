export const renderMovies = (movies, movieList) => {
  movieList.innerHTML = '';

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    const poster = [movie.Poster, movie.poster].find((url) => url && url !== 'N/A') ?? 'https://placehold.co/300x450?text=No+Poster';

    movieCard.classList.add('movie-card');

    movieCard.dataset.id = movie.id;

    movieCard.innerHTML = `
    <img 
        src="${poster}" 
        alt="${movie.title}"
    >

    <div class="movie-info">

        <h3 class="movie-title">
            ${movie.title}
        </h3>

        <p class="movie-year">
            ${movie.year}
        </p>

    </div>
`;
    movieList.appendChild(movieCard);
  });
};
