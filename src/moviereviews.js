import React, { useState } from 'react';

// Movie component
const Movie = ({ movie }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  // Function to handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() !== '') {
      const newReview = {
        text: reviewText,
        id: reviews.length + 1 // generate unique id for review
      };
      setReviews([...reviews, newReview]);
      setReviewText('');
    }
  };

  return (
    <div className="movie">
      <img src={movie.image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.synopsis}</p>
      <div className="rating">Rating: {movie.rating}</div>
      <Stars />
      <ReviewList reviews={reviews} />
      <ReviewForm handleReviewSubmit={handleReviewSubmit} reviewText={reviewText} setReviewText={setReviewText} />
    </div>
  );
};

// Stars component
const Stars = () => {
  const [rating, setRating] = useState(0);

  // Function to handle star click
  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="stars">
      {[...Array(5)].map((star, index) => {
        return (
          <span key={index} onClick={() => handleClick(index)}>
            {index < rating ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

// ReviewList component
const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

// ReviewForm component
const ReviewForm = ({ handleReviewSubmit, reviewText, setReviewText }) => {
  return (
    <form onSubmit={handleReviewSubmit} className="review-form">
      <textarea 
        value={reviewText} 
        onChange={(e) => setReviewText(e.target.value)} 
        placeholder="Write your review..." 
        required 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// MovieList component
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

// App component
const App = () => {
  // Dummy data for movies
  const movies = [
    {
      id: 1,
      title: "Inception",
      image: "inception.jpg",
      synopsis: "A thief who enters the dreams of others to steal their secrets.",
      rating: 4.5
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      image: "shawshank_redemption.jpg",
      synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      rating: 4.8
    }
    // Add more movies as needed
  ];

  return (
    <div className="app">
      <h1>Movie Reviews</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
