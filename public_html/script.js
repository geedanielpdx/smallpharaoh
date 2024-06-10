function initMap() {
  const placeId = 'ChIJ6SGO1AUKlVQRdB7wYgNb7HA'; // Your Google Place ID
  const apiKey = 'AIzaSyB-SDwxIkzzVm_Dx8HiAgjU3N5sEcOfl-c'; // Your Google API Key

  fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          if (data.result && data.result.reviews) {
              const reviews = data.result.reviews;
              displayReviews(reviews);
          } else {
              console.error('No reviews found');
          }
      })
      .catch(error => console.error('Error fetching reviews:', error));
}

function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = ''; // Clear previous reviews if any
  reviews.forEach(review => {
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

document.addEventListener('DOMContentLoaded', initMap);
