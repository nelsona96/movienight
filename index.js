const searchInput = document.querySelector(".search--input");
const searchButton = document.querySelector(".landing__search--button");
const findMovieButton = document.querySelector(".nav__link--movies");
const HTML = document.querySelector("html");

HTML.style.overflow = "auto";

localStorage.clear("search");

searchButton.addEventListener("click", (event) => {
  const search = searchInput.value;
  if (!!search) {
    searchMovie(search);
  }
});

searchInput.addEventListener("keydown", (event) => {
  const search = searchInput.value;
  if (event.key === "Enter") {
    searchMovie(search);
  }
});

function searchMovie(search) {
  localStorage.setItem("search", search);
  // window.location.href += `movies.html`;
  window.location.href = `${window.location.origin}/movies.html`;
}
