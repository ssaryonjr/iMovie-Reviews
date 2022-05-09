const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchBox = document.querySelector('.search-box')
searchIcon.addEventListener('click', function() {
    searchBox.classList.toggle('active')
})



const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

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