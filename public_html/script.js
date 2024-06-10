document.addEventListener('DOMContentLoaded', function() {
  const placeIds = [
      'ChIJ718v6bcLlVQRUzcqgdClZ20', // Midtown Beer Garden Place ID
      'ChIJ6SGO1AUKlVQRdB7wYgNb7HA', // Small Pharaoh Google Place ID
      // Add more place IDs if available
  ];
  const apiKey = 'AIzaSyB-SDwxIkzzVm_Dx8HiAgjU3N5sEcOfl-c'; // Your Google API Key
  let allReviews = [];

  function fetchReviews(placeId) {
      return fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
              if (data.result && data.result.reviews) {
                  allReviews = allReviews.concat(data.result.reviews);
              }
          })
          .catch(error => console.error('Error fetching reviews:', error));
  }

  function displayReviews() {
      const reviewsContainer = document.getElementById('reviews-container');
      reviewsContainer.innerHTML = ''; // Clear previous reviews if any
      allReviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.classList.add('review');
          
          const author = document.createElement('h4');
          author.textContent = review.author_name;
          
          const rating = document.createElement('p');
          rating.textContent = `Rating: ${review.rating}`;
          
          const text = document.createElement('p');
          text.textContent = review.text;
          
          reviewElement.appendChild(author);
          reviewElement.appendChild(rating);
          reviewElement.appendChild(text);
          
          reviewsContainer.appendChild(reviewElement);
      });
  }

  async function initMap() {
      for (const placeId of placeIds) {
          await fetchReviews(placeId);
      }
      displayReviews();
  }

  initMap();

  // Hero Slider
  let currentHeroSlide = 0;
  const heroSlides = document.querySelectorAll('#hero-slider img');
  const totalHeroSlides = heroSlides.length;

  function showHeroSlide(index) {
      heroSlides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
      });
  }

  function nextHeroSlide() {
      currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
      showHeroSlide(currentHeroSlide);
  }

  setInterval(nextHeroSlide, 3000); // Change hero slide every 3 seconds

  // Reviews Carousel
  let currentReviewSlide = 0;

  function showReviewSlide(index) {
      const slides = document.querySelectorAll('.review');
      if (index >= slides.length) {
          currentReviewSlide = 0;
      } else if (index < 0) {
          currentReviewSlide = slides.length - 1;
      } else {
          currentReviewSlide = index;
      }
      const offset = -currentReviewSlide * 100;
      document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
  }

  window.nextSlide = function() {
      showReviewSlide(currentReviewSlide + 1);
  };

  window.prevSlide = function() {
      showReviewSlide(currentReviewSlide - 1);
  };

  setInterval(window.nextSlide, 5000); // Auto-slide every 5 seconds
});
