//Render Movie & TV Covers from API to DOM
window.addEventListener('load', loadMovies)
window.addEventListener('load', loadShows)

const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchBox = document.querySelector('.search-box')

searchIcon.addEventListener('click', function() {
  searchBox.classList.toggle('active')

  //Dropdown search list will disappear and input string will reset if the searchbox is clicked while it's open.
  if(!searchBox.classList.contains('active')){
    searchList.classList.remove('hide-search-list-dropdown')
    searchedTitle.value = ''

  }
})


const searchList = document.querySelector('.search-list-dropdown');
let searchedTitle = document.getElementById('searchMovie')


searchedTitle.addEventListener('input', handleInput)

let timeoutID

function handleInput(){
  searchList.innerHTML = '' //Resets the search list everytime a new key is entered
    clearTimeout(timeoutID)
    timeoutID = setTimeout(fetchThings, 500)
}

function fetchThings(){
    let userInput = (searchedTitle.value).trim()
    console.log(userInput)
    if (userInput.length > 0){
      searchList.classList.add('hide-search-list-dropdown')
    } else {
      searchList.classList.remove('hide-search-list-dropdown')
    }

    fetch(`https://www.omdbapi.com/?apikey=b1f6b3a2&s=${userInput}&type=movie`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      
      data.Search.forEach(movie => {
        const createSearchedItem = document.createElement('div');
        createSearchedItem.classList.add('search-list-item');

        //Add an if statement in case movie cannot be found or there is no picture.
        let moviePoster
        if(movie.Poster != "N/A"){
          moviePoster = movie.Poster
        } else {
          moviePoster = "src/img/noimg.png"
        }

        createSearchedItem.innerHTML = `
        <div class="item-thumbnail">
          <img class="thumbnail" src="${moviePoster}">
        </div>
        <div class="search-item-info">
          <h5>${movie.Title}</h5>
          <p>${movie.Year}</p>
        </div>
        `;

        searchList.appendChild(createSearchedItem)

      });
    })
    .catch(err =>{
      console.log(`Cannot find movie ${userInput}`)
      let errorMessage = document.createElement('p')
      errorMessage.classList.add('error-message')
      errorMessage.innerText = `Cannot find movie '${userInput}'`
      searchList.appendChild(errorMessage)
    })
}




const movieSlider = new Swiper('.movie-slide', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

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

const tvSlider = new Swiper('.tv-slide', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
  
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


  //API Fetching
  function loadMovies(){
    fetch(`https://www.omdbapi.com/?apikey=b1f6b3a2&s=last&type=movie`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      data.Search.forEach(movie => {
        // console.log(movie)

        const movieSlide = document.createElement('div');
        movieSlide.className = 'swiper-slide';
        document.querySelector('.movie-wrapper').appendChild(movieSlide);

        const moviePoster = document.createElement('img');
        moviePoster.className = 'movie-img';
        moviePoster.src = movie.Poster;
        movieSlide.appendChild(moviePoster)

        const movieDetails = document.createElement('figcaption');
        movieSlide.appendChild(movieDetails)

        const movieTitle = document.createElement('h3')
        movieTitle.innerText = movie.Title
        movieDetails.appendChild(movieTitle)


        //Grabs the movie ID for every obj looped. This allows us to access more data from it such as plot, rating, etc.
        let movieID = movie.imdbID

        //Took the movie's ID and fetched for the plot so I can put it in the carousel.
        fetch(`http://www.omdbapi.com/?i=${movieID}&plot=short&apikey=b1f6b3a2`)
        .then(res => res.json()) // parse response as JSON
        .then(id => {
          const moviePlot = document.createElement('p');
          moviePlot.innerText = id.Plot
          movieDetails.append(moviePlot)


          //Button was rendering before the movies description due to fetching for the data. So I used set timer to delay it so it can be at the bottom as intended for style.
          setTimeout(()=>{ 
          const moreInfoBtn = document.createElement('a')
          moreInfoBtn.innerText = 'Read More';
          moreInfoBtn.className = 'read-more';
          movieDetails.appendChild(moreInfoBtn);
          moviePlot.after(moreInfoBtn)
          }, 1000)
          })
         
      });

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function loadShows(){
  fetch(`https://www.omdbapi.com/?apikey=b1f6b3a2&s=show&type=series`)
  .then(response => response.json())
  .then(data =>  {
    data.Search.forEach(show =>{
      
      const showSlide = document.createElement('div');
      showSlide.className = 'swiper-slide';
      document.querySelector('.show-wrapper').appendChild(showSlide);

      const showPoster = document.createElement('img');
      showPoster.className = 'show-img';
      showPoster.src = show.Poster;
      showSlide.appendChild(showPoster)

      const showDetails = document.createElement('figcaption');
        showSlide.appendChild(showDetails)

      const showTitle = document.createElement('h3')
      showTitle.innerText = show.Title
      showDetails.appendChild(showTitle)


       //Grabs the movie ID for every obj looped. This allows us to access more data from it such as plot, rating, etc.
       let showID = show.imdbID

       //Took the show's ID and fetched for the plot so I can put it in the carousel.
       fetch(`http://www.omdbapi.com/?i=${showID}&plot=short&apikey=b1f6b3a2`)
       .then(res => res.json()) // parse response as JSON
       .then(id => {
         const showPlot = document.createElement('p');
         showPlot.innerText = id.Plot
         showDetails.append(showPlot)


         //Button was rendering before the shows description due to fetching for the data. So I used set timer to delay it so it can be at the bottom as intended for style.
         setTimeout(()=>{ 
         const moreInfoBtn = document.createElement('a')
         moreInfoBtn.innerText = 'Read More';
         moreInfoBtn.className = 'read-more';
         showDetails.appendChild(moreInfoBtn);
         showPlot.after(moreInfoBtn)
         }, 1000)
         })
    })
  })
  
  .catch(err => {
    console.log(`error ${err}`)
});
}
