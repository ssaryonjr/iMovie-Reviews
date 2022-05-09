const searchIcon = document.querySelector('.fa-magnifying-glass')
const searchBox = document.querySelector('.search-box')
searchIcon.addEventListener('click', function() {
    searchBox.classList.toggle('active')
})


// window.addEventListener('resize', magic)

// function magic(e){
//     // console.log(window.innerWidth)
//     if(window.innerWidth < 1000) {
//         searchIcon.removeEventListener('mouseover', function() {
//             searchBox.classList.toggle('active')
//         })
//     }
//     else console.log("I'm so big!")
// }