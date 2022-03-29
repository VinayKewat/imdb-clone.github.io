// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
const res = await fetch(`${URL}`);
const data = await res.json();
if(data.Response == "True") displayMovieList(data.Search);
}


// for find the movies
function findMovies(){
let searchTerm = (movieSearchBox.value).trim();
if(searchTerm.length > 0){
searchList.classList.remove('hide-search-list');
loadMovies(searchTerm);
} else {
searchList.classList.add('hide-search-list');
}
}


// displaying the movies
function displayMovieList(movies){
searchList.innerHTML = "";
for(let idx = 0; idx < movies.length; idx++){
let movieListItem = document.createElement('div');
movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
movieListItem.classList.add('search-list-item');
if(movies[idx].Poster != "N/A")
moviePoster = movies[idx].Poster;
else 
moviePoster = "image_not_found.png"
movieListItem.innerHTML = `
<div class = "search-item-thumbnail">
<img src = "${moviePoster}">
</div>
<div class = "search-item-info">
<h3>${movies[idx].Title}</h3>
<p>${movies[idx].Year}</p>
</div>
`;
searchList.appendChild(movieListItem);
}
loadMovieDetails();
}


// load process
function loadMovieDetails(){
const searchListMovies = searchList.querySelectorAll('.search-list-item');
searchListMovies.forEach(movie => {
movie.addEventListener('click', async () => {
searchList.classList.add('hide-search-list');
movieSearchBox.value = "";
const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
const movieDetails = await result.json();
displayMovieDetails(movieDetails);
});
});
}

// print detail of movies
function displayMovieDetails(details){
resultGrid.innerHTML = `
<div class = "movie-poster">
<img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
</div>
<div class = "movie-info">
<h3 class = "movie-title">${details.Title}</h3>
<ul class = "movie-misc-info">
<li class = "year">Year: ${details.Year}</li>
<li class = "rated">Ratings: ${details.Rated}</li>
<li class = "released">Released: ${details.Released}</li>
</ul>
<p class = "genre"><b>Genre:</b> ${details.Genre}</p>
<p class = "writer"><b>Writer:</b> ${details.Writer}</p>
<p class = "actors"><b>Actors: </b>${details.Actors}</p>
<p class = "plot"><b>Plot:</b> ${details.Plot}</p>
<p class = "language"><b>Language:</b> ${details.Language}</p>
<p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
</div>
`;
}

// declare for hide the search 
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});

// if u click sumit the it submit
$(document).ready(() => {
getMovies("India");
$('#searchForm').on('submit', (e) => {
let searchText = $('#searchText').val();
getMovies(searchText);
e.preventDefault();
});
});


// function for search movies
function getMovies(searchText){
axios.get('https://www.omdbapi.com/?apikey=a74dd11d&s='+searchText)
.then((response) => {
console.log(response);
let movies = response.data.Search;
let output = '';
$.each(movies, (index, movie) => {
output += `
<div class="card col-md-2" >
<img src="${movie.Poster}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${movie.Title}</h5>
<p class="card-text">Released : ${movie.Year}</p>
<a  onclick="getMovie('${movie.imdbID}')" class="btn btn-primary" data-target="#myModal" data-toggle ="modal">DETAILS</a>
</div>
</div>
`;
});

// for throw error
$('#movies').html(output);
})
.catch((err) => {
console.log(err);
}); 
}
 
// declare for movies rates release date and all 
function getMovie(id){
let movieId = id;
axios.get('https://www.omdbapi.com/?apikey=a74dd11d&i='+movieId)
.then((response) => {
console.log(response);
let movie = response.data;
let output =`
<div class="card ">
<img src="${movie.Poster}" class="card-img-top modal" alt="...">
<div class="card-body">
<h5 class="card-title">${movie.Title}</h5>
<ul class="list-group">
<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
<li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
</ul>
</div>
</div>
<hr>
<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
</div>
`;

// forthrow the error
$('#myModal').html(output);
})
.catch((err) => {
console.log(err);
});
}
  




