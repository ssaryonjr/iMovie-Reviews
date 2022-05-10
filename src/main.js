const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchBox = document.querySelector('.search-box')
searchIcon.addEventListener('click', function() {
    searchBox.classList.toggle('active')
})


const tvSlider = new Swiper('.tv-slide', {
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

const swiper = new Swiper('.swiper', {
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
  function loadShows(){
    fetch(`https://www.omdbapi.com/?apikey=b1f6b3a2&s=last&type=movie&plot=short`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.Search)

      data.Search.forEach(show => {
        console.log(show)

        const tvSlide = document.createElement('div');
        tvSlide.className = 'swiper-slide';
        document.querySelector('.tv-wrapper').appendChild(tvSlide);

        const tvPoster = document.createElement('img');
        tvPoster.className = 'tv-img';
        tvPoster.src = show.Poster;
        tvSlide.appendChild(tvPoster)

        const tvDetails = document.createElement('figcaption');
        tvSlide.appendChild(tvDetails)

        const tvTitle = document.createElement('h3')
        tvTitle.innerText = show.Title
        tvDetails.appendChild(tvTitle)

      });

      console.log(data)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

// document.addEventListener('DOMContentLoaded', loadShows)
window.addEventListener('load', loadShows)