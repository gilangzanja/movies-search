export const openModal = (movie, modal, modalBody) => {
  const poster =
    [movie.Poster, movie.poster].find((url) => url && url !== 'N/A') ??
    'https://placehold.co/300x450?text=No+Poster';

  modalBody.innerHTML = ` 
  <img src="${poster}" 
  alt="${movie.title}" 
  class="modal-poster" > 
  <div class="modal-info"> 
  <h2>${movie.title}</h2> 
  <p> <strong>Year:</strong> ${movie.year} 
  </p> 
  <p> <strong>Genre:</strong> ${movie.genre} </p>
   <p> ${movie.description} </p>
    </div> `;
  modal.classList.remove('hidden');
};

export const closeModal = (modal) => {
  modal.classList.add('hidden');
};
