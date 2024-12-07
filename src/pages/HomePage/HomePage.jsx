import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../services/apiService";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return <MovieList movies={movies} />;
}

export default HomePage;
