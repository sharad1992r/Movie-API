const searchId = localStorage.getItem("id");
const movieData = document.querySelector(".movie__row");
const searchVal = localStorage.getItem("searchValue");
const movieWrapperEl = document.querySelector(".movie__wrapper");

async function main(search) {
  const detail = await fetch(
    `https://www.omdbapi.com/?apikey=4c36f2be&i=${search}`
  );
  const movieDetail = await detail.json();
  movieData.innerHTML = getDataHTML(movieDetail);
}
main(searchId);

function getDataHTML(data) {
  console.log(data);
  return ` <div class="movie__data--wrapper">
    <figure class="movie__data--figure">
        <img src="${data.Poster}" alt="" class="movie__img" >
    </figure>
    <div class="movie__data">
        <p class="movie__data--title">Genre:<span class="movie__data--description">${data.Genre}</span></p>
        <p class="movie__data--title">Actors:<span class="movie__data--description">${data.Actors}</span></p>
        <p class="movie__data--title">Plot:<span class="movie__data--description">${data.Plot}</span></p>
        <p class="movie__data--title">Ratings:<span class="movie__data--description">${data.imdbRating}</span></p>
        <p class="movie__data--title">Type:<span class="movie__data--description">${data.Type}</span></p>
        <p class="movie__data--title">Year:<span class="movie__data--description">${data.Year}</span></p>
    </div>
</div>
<div class="movie__data--heading">
    <h2 class="movie__data--title">${data.Title}</h2>
</div>`;
}

async function similarMovies(currentId, searchVal) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=4c36f2be&s=${searchVal}`
  );
  const moviesData = await response.json();
  const movies = moviesData.Search;
  console.log(movies);
  console.log(movies[0].imdbID);
  const sameMovies = movies
    .filter((movie) => movie.imdbID !== currentId)
    .slice(0, 3);
  const sameMovie = sameMovies.map((data) => similarHTML(data)).join("");
  movieWrapperEl.innerHTML = sameMovie;
}

function similarHTML(data) {
  console.log(data);
  return `<div class="movie" onclick="showDetail('${data.imdbID}')">
    <img class="movie__img" src="${data.Poster}" alt="" />
    <h3 class="movie__title">${data.Title}</h3>
    <p class="movie__sub-title">${data.Year}</p>
  </div>`;
}

function showDetail(id) {
  console.log(id);
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/movieData.html`;
}
const currentId = localStorage.getItem("id");
similarMovies(currentId, searchVal);

