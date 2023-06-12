const movieWrapperEl = document.querySelector(".movie__wrapper");
const searchVal = localStorage.getItem("searchValue");
const movie = document.querySelectorAll(".movie");

async function renderMovies(searchVal, filter) {
  const data = await fetch(
    `https://www.omdbapi.com/?apikey=4c36f2be&s=${searchVal}`
  );
  const moviesData = await data.json();
  const movies = moviesData.Search;
  console.log(movies);
  if (filter === "OLD_TO_NEW") {
    movies.sort((a, b) => {
      return parseInt(a.Year) - parseInt(b.Year);
    });
  } else if (filter === "NEW_TO_OLD") {
    movies.sort((a, b) => {
      return parseInt(b.Year) - parseInt(a.Year);
    });
  }

  try {
    movieWrapperEl.innerHTML = movies
      .filter((_movie, index) => index < 9)
      .map((movie) => movieHTML(movie))
      .join("");
  } catch (error) {
    movieWrapperEl.innerHTML = `"<h5> Sorry, not found any movie."</h5>`;
  }
}

function movieHTML(movie) {
  return `<div class="movie" onclick="showDetails('${movie.imdbID}')">
            <img class="movie__img" src="${movie.Poster}" alt="" >
            <h3 class="movie__title">
                ${movie.Title}
            </h3>
            <p class="movie__sub-title">${movie.Year}</p>
        </div>`;
}

function filterTube(event) {
  renderMovies(searchVal, event.target.value);
}

function showDetails(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/movieData.html`;
}
setTimeout(() => renderMovies(searchVal));
