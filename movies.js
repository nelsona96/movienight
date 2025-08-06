const searchInput = document.querySelector(".search--input");
const searchButton = document.querySelector(".header__search--icon");
const filterSelect = document.querySelector("#filter");
let currentSearch = "";
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

filterSelect.addEventListener("change", (event) => {
  searchMovies(currentSearch, event.target.value);
});

async function searchMovies(search, filter) {
  let resultsHTML = document.querySelector(".results");
  let searchTextHTML = document.querySelector(".results__info--container");
  currentSearch = search;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=6dbbb021`
    );
    const movies = await response.json();
    const moviesSearch = movies.Search.slice(0, 6);

    moviesSearch.sort((a, b) => b.Year - a.Year);

    if (!!movies.Response) {
      if (filter === "A_TO_Z") {
        moviesSearch.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (filter === "Z_TO_A") {
        moviesSearch.sort((a, b) => b.Title.localeCompare(a.Title));
      } else if (filter === "DATE_NEWEST") {
        moviesSearch.sort((a, b) => b.Year - a.Year);
      } else if (filter === "DATE_OLDEST") {
        moviesSearch.sort((a, b) => a.Year - b.Year);
      }
      searchTextHTML.innerHTML = searchHTML(search);
      resultsHTML.innerHTML = moviesSearch
        .map((movie) => movieHTML(movie))
        .join("");
    }
  } catch (error) {
    searchTextHTML.firstElementChild.innerHTML = `No results for: <q class="text--highlight">${search}</q>`;
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
        <h3 title="${movie.Title}" class="movie__title">${movie.Title}</h3>
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

function goHome() {
  // github method:
  window.location.href = `${window.location.origin}/movienight`

  // live server method:
  // window.location.href = `${window.location.origin}/index.html`;
}

if (!!searchLocal) {
  searchMovies(searchLocal);
}
