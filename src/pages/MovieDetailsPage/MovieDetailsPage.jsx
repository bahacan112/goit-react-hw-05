import {
  useParams,
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../services/apiService";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate kancası eklendi
  const [movie, setMovie] = useState(null);

  // Geldiğiniz sayfayı saklayın, yoksa varsayılan olarak "/movies" kullanın
  const from = location.state?.from || "/movies";

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className={styles.div}>
      {/* Go Back Butonu */}
      <button onClick={() => navigate(from)}>Go Back</button>

      <h1>{movie.title}</h1>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
      </div>

      {/* İç İçe Navigasyon Bağlantıları */}
      <nav className={styles.nav}>
        <NavLink
          to="cast"
          state={{ from }}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Cast
        </NavLink>
        {" | "}
        <NavLink
          to="reviews"
          state={{ from }}
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Reviews
        </NavLink>
      </nav>

      {/* İçerik Alanı */}
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
