document.addEventListener('DOMContentLoaded', fetchTopSliderData)
document.addEventListener('DOMContentLoaded', fetchBottomSliderData)

//Functionality for search bar / modal

const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchList = document.querySelector('.search-list-dropdown');
let searchedInput = document.getElementById('searchMovie');

//Load dropdown search list data from OMDb API
async function fetchSearchListData(searchTerm){
    const URL = `https://www.omdbapi.com/?apikey=5cfbbc87&s=${searchTerm}&type=movie`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data)
    if (data.Response == "True") {loadSearchedMovies(data.Search)}

    else if (data.Response == 'False'){
    // console.log(`Cannot find movie ${searchTerm}`)
          let errorMessage = document.createElement('p')
          errorMessage.classList.add('error-message')
          errorMessage.innerText = `Cannot find movie '${searchTerm}'`
          searchList.appendChild(errorMessage)
    }
}


//Expands and closes the search bar located in the top navigation.
searchIcon.addEventListener('click', () => {
  const searchBox = document.querySelector('.search-box')
  searchBox.classList.toggle('active')

  //Dropdown search list will disappear and input string will reset if the searchbox is clicked while it's open.
  if(!searchBox.classList.contains('active')){
    searchList.classList.remove('show-search-list-dropdown')
    searchedInput.value = '';
  }
})


//Registers user input from searchbar after a 1 second delay.
searchedInput.addEventListener('input', handleInput)

let timeoutID //Needs to be left outside of handleInput() function.
function handleInput(){
  searchList.innerHTML = '' //Clears the search list when a new key is entered after brief delay.
  clearTimeout(timeoutID) //If user is continuing to type in the searchbar before the 1 second delay ends the fetchMovies() function will not fire off until user stops.
  searchList.classList.remove('show-search-list-dropdown')
  timeoutID = setTimeout(displaySearchList, 500)
}


//Grabs user input and finds movie titles from Movie API based off input given. Then returns it into the search list.
function displaySearchList(){
  let userInput = (searchedInput.value).trim()
    // console.log(userInput)
    if (userInput.length > 0){
      searchList.classList.add('show-search-list-dropdown')
      fetchSearchListData(userInput) 
    } else {
      searchList.classList.remove('show-search-list-dropdown')
    } 
}


function loadSearchedMovies(movies){
  movies.forEach(movie => {
    const createSearchedMovie = document.createElement('div');
    createSearchedMovie.classList.add('searched-list-item');
    createSearchedMovie.dataset.id = movie.imdbID;
    //Create a dataset for each movie later so when that movie is clicked we can open it up in the modal with all its data to show user.
  
    if(movie.Poster != "N/A"){
      moviePoster = movie.Poster
    } else {
      moviePoster = "src/img/noimg.png"
    }

    createSearchedMovie.innerHTML = `
    <div class="item-thumbnail">
      <img class="thumbnail" src="${moviePoster}">
    </div>
    <div class="searched-item-info">
      <h5>${movie.Title}</h5>
      <p>${movie.Year}</p>
    </div>
    `
    searchList.appendChild(createSearchedMovie)

  });

  fetchClickedMovie()
}


function fetchClickedMovie(){
  const allFetchedMoviesList = searchList.querySelectorAll('.searched-list-item');
  allFetchedMoviesList.forEach(movie =>{
    movie.addEventListener('click', async () =>{
      // console.log(movie.dataset.id)
      searchList.classList.remove('show-search-list-dropdown');
      searchedInput.value = '';
      const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=5cfbbc87&plot=full`)
      const clickedMovie = await result.json();
      loadClickedMovie(clickedMovie)
      openModal()
    })
  })
}

function loadClickedMovie(movie){
  modal.innerHTML = `
  <figure class="close-modal">&times;</figure> 
  <div class="modal-movie-poster">
          <img src="${(movie.Poster != "N/A") ? movie.Poster : "src/img/noimg.png"}" alt="movie poster">
        </div>
        <div class="modal-movie-info">
          <h1>${movie.Title}</h1>
          <ul class="release-info">
            <li>Released: ${movie.Released}</li>
          </ul>
          <p class="movie-rated"><b>Ratings:</b>${movie.Rated}</p>
          <ul class="generic-info">
            <li class="genre"><b>Genre:</b> ${movie.Genre}</li>
            <li><b>Director:</b> ${movie.Director}</li>
            <li><b>Rating:</b> ${movie.imdbRating}/10 <i class="fa-solid fa-star"></i></li>
            <li><b>Plot:</b> ${movie.Plot}</li>
          </ul>
        </div>
  `

  let xBtn = document.createElement('figure');
  xBtn.classList.add('close-modal');
  xBtn.innerHTML = '&times;';
  modal.append(xBtn);
  xBtn.addEventListener('click', closeModal);
}


const modalOverlay = document.querySelector('.modal-overlay');
modalOverlay.addEventListener('mouseup', closeModal);
const modal = document.querySelector('.modal');


function openModal(){
  modalOverlay.classList.remove('modal-hidden');
	modal.classList.remove('modal-hidden');
	document.querySelector('body').style.overflow = 'hidden';
}


function closeModal(e) {
	modalOverlay.classList.add('modal-hidden');
	modal.classList.add('modal-hidden');
	document.querySelector('body').style.overflow = 'visible';
}

document.addEventListener('keyup', escapeKeyHandle);
function escapeKeyHandle(e) {
	if(e.key !== 'Escape') return;
	closeModal();
}


//Fetching Data from API to load movie posters on Carousel Slides generated from Swiper.JS
async function fetchTopSliderData(){
  const URL = `https://www.omdbapi.com/?apikey=5cfbbc87&s=last&type=movie`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data)
  if (data.Response == "True") {loadTopSliderMovies(data.Search)}

  // if (data.Response == 'False'){console.log(`Cannot fetch ${data}`)}
}

function loadTopSliderMovies(movies){
  movies.forEach(movie =>{
    let movieID = movie.imdbID
    //Took the movie's ID and fetched for the plot so I can put it in the carousel.
   fetch(`https://www.omdbapi.com/?i=${movieID}&plot=short&apikey=5cfbbc87`)
  .then(res => res.json()) // parse response as JSON
  .then(movieDetails => {
    const movieSlide = document.createElement('div');
    movieSlide.className = 'swiper-slide';
    document.querySelector('.top-wrapper').appendChild(movieSlide);

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-img';
    moviePoster.src = movie.Poster;
    movieSlide.appendChild(moviePoster)

    const movieInfo = document.createElement('figcaption');
    movieSlide.appendChild(movieInfo)

    const movieTitle = document.createElement('h3')
    movieTitle.innerText = movie.Title
    movieInfo.appendChild(movieTitle)

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movieDetails.Plot
    movieInfo.append(moviePlot)

    const moreInfoBtn = document.createElement('a')
    moreInfoBtn.innerText = 'Read More';
    moreInfoBtn.className = 'read-more';
    moreInfoBtn.dataset.id = movie.imdbID;
    movieInfo.appendChild(moreInfoBtn);
    moviePlot.after(moreInfoBtn)

    fetchClickedButton(moreInfoBtn)
    })
  })
}




function fetchClickedButton(e){
  e.addEventListener('click', async () =>{
    const result = await fetch(`https://www.omdbapi.com/?i=${e.dataset.id}&apikey=5cfbbc87&plot=full`)
    const clickedMovie = await result.json();
    loadClickedMovie(clickedMovie)
    openModal()
  })
}

//Loads the header cover movie details. (Dark)
const headerBtn = document.querySelector('.movie-cover-btn')
headerBtn.dataset.id = 'tt5753856';
fetchClickedButton(headerBtn)



async function fetchBottomSliderData(){
  const URL = `https://www.omdbapi.com/?apikey=5cfbbc87&s=show&type=series`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data)
  if (data.Response == "True") {loadBottomSliderMovies(data.Search)}

  // if (data.Response == 'False'){console.log(`Cannot fetch ${data}`)}
}

function loadBottomSliderMovies(movies){
  movies.forEach(movie =>{
    let movieID = movie.imdbID
   fetch(`https://www.omdbapi.com/?i=${movieID}&plot=short&apikey=5cfbbc87`)
  .then(res => res.json()) // parse response as JSON
  .then(movieDetails => {
    const movieSlide = document.createElement('div');
    movieSlide.className = 'swiper-slide';
    document.querySelector('.bottom-wrapper').appendChild(movieSlide);

    const moviePoster = document.createElement('img');
    moviePoster.className = 'bottom-img';
    moviePoster.src = movie.Poster;
    movieSlide.appendChild(moviePoster)

    const movieInfo = document.createElement('figcaption');
    movieSlide.appendChild(movieInfo)

    const movieTitle = document.createElement('h3')
    movieTitle.innerText = movie.Title
    movieInfo.appendChild(movieTitle)

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movieDetails.Plot
    movieInfo.append(moviePlot)

    const moreInfoBtn = document.createElement('a')
    moreInfoBtn.innerText = 'Read More';
    moreInfoBtn.className = 'read-more';
    moreInfoBtn.dataset.id = movie.imdbID;
    movieInfo.appendChild(moreInfoBtn);
    moviePlot.after(moreInfoBtn)

    fetchClickedButton(moreInfoBtn)
    })
  })
}

//Swiper.JS 
const topMovieSlider = new Swiper('.top-movie-slider', {
  // Optional parameters
  direction: 'horizontal',
  // autoplay: true,
  // loop: false,
  // reverseDirection: true,
  

slidesPerView: 1,
spaceBetween: 10,
// Responsive breakpoints
breakpoints: {
  490: {
      slidesPerView: 2,
      spaceBetween: 25
    },

  700: {
      slidesPerView: 3,
      spaceBetween: 15
    },
  // when window width is >= 440px
  1025: {
    slidesPerView: 4,
    spaceBetween: 15
  },
  // when window width is >= 660px
  1300: {
    slidesPerView: 5,
    spaceBetween: 15
  },
  // when window width is >= 100px
  1600: {
    slidesPerView: 6,
    spaceBetween: 15
  }
}
});

const bottomMovieSlider = new Swiper('.bottom-movie-slider', {
    // Optional parameters
    direction: 'horizontal',
    // loop: false,
    // autoplay: true,
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    490: {
        slidesPerView: 2,
        spaceBetween: 25
      },

    700: {
        slidesPerView: 3,
        spaceBetween: 15
      },
    // when window width is >= 440px
    1025: {
      slidesPerView: 4,
      spaceBetween: 15
    },
    // when window width is >= 660px
    1300: {
      slidesPerView: 5,
      spaceBetween: 15
    },
    // when window width is >= 100px
    1600: {
      slidesPerView: 6,
      spaceBetween: 15
    }
  }
  });

