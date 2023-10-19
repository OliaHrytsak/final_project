let changeTheme = document.querySelector('.change__theme');
const images = ['./img/stiker-780x470.jpg', './img/depositphotos_301374900-stock-photo-top-view-smartphone-blank-screen.jpg']; // Масив із URL-шляхами до зображень
let currentIndex = 0;


changeTheme.addEventListener('click', function() {
    document.body.style.backgroundImage = `url("${images[currentIndex]}")`
    currentIndex = (currentIndex + 1) % images.length;
});