import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/apiService";
import PropTypes from "prop-types";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch((err) => {
        setError("Failed to load cast information.");
        console.log(err);
      });
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (cast.length === 0) {
    return <p className={styles.noData}>No cast information found.</p>;
  }

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.castItem}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={name}
          />
          <p>
            <b>{name}</b> as {character}
          </p>
        </li>
      ))}
    </ul>
  );
}

MovieCast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
};

export default MovieCast;
