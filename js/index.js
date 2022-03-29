// here we declare api of https://www.omdbapi.com/?apikey=a74dd11d&
// then fetch  for search box

// get the api
$(document).ready(() => {
getMovies("India");
$('#searchForm').on('submit', (e) => {
let searchText = $('#searchText').val();
getMovies(searchText);
e.preventDefault();
});
});

// api call
function getMovies(searchText){
axios.get('https://www.omdbapi.com/?apikey=a74dd11d&s='+searchText)
.then((response) => {
console.log(response);
let movies = response.data.Search;
let output = '';
$.each(movies, (index, movie) => {
output += `
<div class="card col-md-2" >
<i src="${movie.Poster}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${movie.Title}</h5>
<p class="card-text">Released : ${movie.Year}</p>
<a  onclick="getMovie('${movie.imdbID}')" class="btn btn-primary" data-target="#myModal" data-toggle ="modal">DETAILS</a>
</div>
</div>
 `;
});

// throwing error 
$('#movies').html(output);
})
.catch((err) => {
  console.log(err);
});
}

// print out 
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
< href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMD
<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
</div>
`;

// throw errr for output if api is not work 
$('#myModal').html(output);
})
.catch((err) => {
console.log(err);
});
}



/*This is a very simple app that holds list of the movies. You can add movies and delete them from the list. It also has a functional search bar. 
This app is very similar to the one made by youtube content creator "The Net Ninja" in his Javascript DOM tutorial series. So, I made my own version of the same app for practice purposes. This is my first time ever using Javascript for DOM manipulation and I wanted to keep desing simple. */

let movieList = document.querySelector("#movie-list");

//delete movies
movieList.addEventListener("click", function (e) {
if (e.target.className == "delete") {
e.target.parentElement.style.display = "none";
}
});

//add movies
let addMovie = document.forms[1];
addMovie.addEventListener("submit", function (e) {
e.preventDefault();
let value = addMovie.querySelector("input[type = 'text']").value;
let li = document.createElement("li");
let movieTitle = document.createElement("span");
let delBtn = document.createElement("span");
movieTitle.textContent = value;
delBtn.textContent = "delete";
movieTitle.classList.add("title");
delBtn.classList.add("delete");
li.appendChild(movieTitle);
li.appendChild(delBtn);
movieList.appendChild(li);
addMovie.querySelector("input[type='text']").value = "";
});

//hide movies
let hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", function (e) {
if (hideBox.checked) {
movieList.style.display = "none";
} else {
movieList.style.display = "block";
}
});

//filter movies
let searchBar = document.forms[0];
searchBar.addEventListener("keyup", function (e) {
let term = searchBar.querySelector("input").value.toLowerCase();
let movies = document.querySelectorAll(".title");
movies.forEach((movie) => {
if (movie.textContent.toLowerCase().indexOf(term) != -1) {
movie.parentElement.style.display = "flex";
} else {
movie.parentElement.style.display = "none";
}
});
});
