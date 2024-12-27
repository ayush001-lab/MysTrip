$(document).ready(function () {
    if (window.innerWidth >= 769) {
        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: '<button class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="fas fa-chevron-right"></i></button>'
        });
    }

    
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('#header').addClass('solid');
        } else {
            $('#header').removeClass('solid');
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const flexboxes = Array.from(slider.children);
    let currentIndex = 0;
    flexboxes.forEach((flexbox) => {
      const clone = flexbox.cloneNode(true);
      slider.appendChild(clone);
    });
  
    const updateSliderPosition = () => {
      const flexboxWidth = document.querySelector(".flexbox").offsetWidth + 20; 
      slider.style.transform = `translateX(-${currentIndex * flexboxWidth}px)`;
      slider.style.transition = "transform 0.5s ease";
    };
  
    const resetSliderPosition = () => {
      slider.style.transition = "none"; 
      const totalItems = slider.children.length / 2;
      currentIndex = currentIndex % totalItems;
      slider.style.transform = `translateX(-${currentIndex * (document.querySelector(".flexbox").offsetWidth + 20)}px)`;
    };
  
    const autoSlide = () => {
      currentIndex++;
      updateSliderPosition();
      setTimeout(() => {
        if (currentIndex >= slider.children.length / 2) {
          resetSliderPosition();
        }
      }, 500);
    };
  
    
    let autoSlideInterval = setInterval(autoSlide, 3000); 
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
  
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval); 
      currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
      updateSliderPosition();
      autoSlideInterval = setInterval(autoSlide, 3000); 
    });
  
    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval); 
      currentIndex = (currentIndex + 1) % slider.children.length;
      updateSliderPosition();
      autoSlideInterval = setInterval(autoSlide, 3000); 
    });
  
    slider.addEventListener("mouseover", (event) => {
      if (event.target.closest(".flexbox")) {
        const flexbox = event.target.closest(".flexbox");
        if (!flexbox.querySelector(".details-btn")) {
          const detailsBtn = document.createElement("button");
          detailsBtn.classList.add("details-btn");
          detailsBtn.innerText = "Details";
          flexbox.appendChild(detailsBtn);
        }
      }
    });
  

    window.addEventListener("resize", updateSliderPosition);
  });
  
