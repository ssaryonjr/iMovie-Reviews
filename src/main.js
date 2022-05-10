const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchBox = document.querySelector('.search-box')
searchIcon.addEventListener('click', function() {
    searchBox.classList.toggle('active')
})

fillData()


const tvSlide = new Swiper('.tv-slide', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

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

  const movieSlide = new Swiper('.movie-slide', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

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
  function fillData(){
    fetch(`https://www.omdbapi.com/?apikey=b1f6b3a2&s=last&type=movie&plot=full`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      // console.log(data.Search)
      data.Search.forEach(movie => {
        console.log(movie)
      });

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}
