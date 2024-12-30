$(document).ready(function () {
  // Initialize the carousel for larger screens
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

  // Change header background on scroll
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
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;
  let autoSlideInterval;

  // Calculate the flexbox width (including margin)
  const getFlexboxWidth = () =>
    document.querySelector(".flexbox").offsetWidth + 20;

  // Clone items to create an infinite loop
  const originalItemsCount = flexboxes.length;
  const flexboxWidth = getFlexboxWidth();

  flexboxes.forEach((flexbox) => {
    const clone = flexbox.cloneNode(true);
    slider.appendChild(clone);
  });

  // Update total items count after cloning
  const totalItems = slider.children.length;

  // Update the slider position
  const updateSliderPosition = () => {
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${currentIndex * getFlexboxWidth()}px)`;
  };

  // Reset the slider position for infinite scrolling
  const resetSliderPosition = () => {
    slider.style.transition = "none";
    currentIndex = currentIndex % originalItemsCount;
    slider.style.transform = `translateX(-${currentIndex * getFlexboxWidth()}px)`;
  };

  // Auto-slide function
  const autoSlide = () => {
    currentIndex++;
    updateSliderPosition();

    // Reset after reaching the clones
    if (currentIndex >= totalItems) {
      setTimeout(() => {
        resetSliderPosition();
      }, 500); // Wait for the transition to complete
    }
  };

  // Initialize auto-slide
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(autoSlide, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Manual control for previous button
  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;

    // Handle infinite loop transition
    if (currentIndex < 0) {
      currentIndex = totalItems - 1;
      resetSliderPosition();
    }
    updateSliderPosition();
    startAutoSlide();
  });

  // Manual control for next button
  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % totalItems;

    // Handle infinite loop transition
    if (currentIndex >= totalItems) {
      currentIndex = 0;
      resetSliderPosition();
    }
    updateSliderPosition();
    startAutoSlide();
  });

  // Add "Details" button dynamically on hover
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

  // Recalculate the width and update the position on window resize
  window.addEventListener("resize", () => {
    resetSliderPosition();
  });

  // Start auto-slide
  startAutoSlide();
});


const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const params = {
      from_name: name,
      email_id: email,
      message: message,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
      .then(function (response) {
        alert('Message sent successfully!');
        contactForm.reset();
      }, function (error) {
        alert('Failed to send message. Please try again.');
        console.log('Error:', error);
      });
  });
}

const radioButtons = document.querySelectorAll('input[name="form-toggle"]');
const generalForm = document.getElementById('general-form');
const itineraryForm = document.getElementById('itinerary-form');

if (radioButtons.length && generalForm && itineraryForm) {
  radioButtons.forEach(button => {
    button.addEventListener('change', (e) => {
      if (e.target.value === 'general') {
        generalForm.classList.add('active');
        itineraryForm.classList.remove('active');
      } else {
        itineraryForm.classList.add('active');
        generalForm.classList.remove('active');
      }
    });
  });
}
document.getElementById('request-itinerary-btn').addEventListener('click', function(event) {
  event.preventDefault();

  var templateParams = {
      name: document.getElementById('itinerary-name').value,
      contact: document.getElementById('itinerary-contact').value,
      age: document.getElementById('itinerary-age').value,
      days: document.getElementById('itinerary-no.ofdays').value,
      people: document.getElementById('itinerary-no.ofPeople').value,
      expectations: document.getElementById('itinerary-expect').value
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
          console.log('FAILED...', error);
      });
}); 
