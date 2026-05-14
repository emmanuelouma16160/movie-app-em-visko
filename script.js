// ==========================
// API CONFIGURATION
// ==========================
const API_KEY = ""; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");

// ==========================
// FETCH MOVIES
// ==========================
async function fetchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

// ==========================
// DISPLAY MOVIES USING LOOP
// ==========================
function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.overview.substring(0, 100)}...</p>
      </div>
    `;

    moviesContainer.appendChild(movieEl);
  });
}

// ==========================
// LOAD POPULAR MOVIES
// ==========================
fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

// ==========================
// GENRE FILTER
// ==========================
document.querySelectorAll(".genres button").forEach(btn => {
  btn.addEventListener("click", () => {
    const genreId = btn.getAttribute("data-genre");

    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  });
});

// ==========================
// SEARCH FUNCTION
// ==========================
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value;

    fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }
});



