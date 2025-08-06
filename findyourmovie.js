const searchInput = document.querySelector(".search--input");
const searchButton = document.querySelector(".header__search--icon");
let searchLocal = localStorage.getItem("search");

searchButton.addEventListener("click", (event) => {
  const searchString = searchInput.value;
  if (!!searchString) {
    searchMovies(searchString);
  }
});

searchInput.addEventListener("keydown", (event) => {
  const searchString = searchInput.value;
  if (event.key === "Enter") {
    searchMovies(searchString);
  }
});

async function searchMovies(search) {
  let resultsHTML = document.querySelector(".results");
  let searchTextHTML = document.querySelector(".results__info--container");

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${search}&apikey=6dbbb021`
    );
    const movies = await response.json();
    const moviesSearch = movies.Search;
    resultsHTML.innerHTML = moviesSearch
      .map((movie) => movieHTML(movie))
      .slice(0, 6)
      .join("");
    searchTextHTML.innerHTML = searchHTML(search);
  } catch {
    const noResults = document.querySelector(".results__info");
    noResults.innerHTML = `No results for: <q class="text--highlight">${search}</q>`;
    resultsHTML.innerHTML = "";
  }
}

function movieHTML(movie) {
  return `
    <div class="movie__wrapper">
    <div class="movie">
    <div class="movie__img--wrapper">
        <img src="${movie.Poster}" class="movie__img" />
        </div>
        <div class="movie__description">
        <h3 class="movie__title">${movie.Title}</h3>
        <p class="year">${movie.Year}</p>
        </div>
        </div>
        </div>
        `;
}

function searchHTML(search) {
  return `
        <h3 class="results__info">
        Search Results for: <q class="text--highlight">${search}</q>
        </h3>
        `;
}

if (!!searchLocal) {
  searchMovies(searchLocal);
}
