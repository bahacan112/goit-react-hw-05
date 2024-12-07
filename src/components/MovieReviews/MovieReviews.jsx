import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/apiService";
import PropTypes from "prop-types";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(setReviews)
      .catch((err) => {
        setError("Failed to load reviews.");
        console.log(err);
      });
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className={styles.noData}>No reviews found.</p>;
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.reviewItem}>
          <h3>Author: {author}</h3>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default MovieReviews;
