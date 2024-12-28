// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

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
});