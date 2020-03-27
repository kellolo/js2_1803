var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var oldSlide = 0;
var slideInterval = setInterval(nextSlide,2000);

function nextSlide(){
  slides[currentSlide].innerHTML = 'slide ' + currentSlide;
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide+1)%slides.length;
  slides[currentSlide].innerHTML = 'slide active ' + currentSlide;
  slides[currentSlide].classList.add("active");
}
