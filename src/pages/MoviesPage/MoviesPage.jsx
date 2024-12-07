import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/apiService";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";
function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (!query) return;
    setSearchParams({ query });
  };

  useEffect(() => {
    if (query) {
      fetchMoviesByQuery(query).then(setMovies).catch(console.error);
    }
  }, [query]);

  return (
    <>
      <form onSubmit={handleSearch} className={styles.form}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </>
  );
}

export default MoviesPage;
