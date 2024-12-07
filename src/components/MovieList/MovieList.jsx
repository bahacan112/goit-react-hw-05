import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return <p className={styles.noData}>No movies found.</p>;
  }

  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.movieItem}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={title}
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ),
};

export default MovieList;
