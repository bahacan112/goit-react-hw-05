import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTdiZDc4MDgyYTc4Njk0YTEzZDVlNTJjNWFkZGVlMCIsIm5iZiI6MTcyNDAwNjY1MC4xOTgwMDAyLCJzdWIiOiI2NmMyNDBmYTRkZjI5NDU2YmFkMGMyZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6x3HZbqXg9rvV6bR0UyrSqW8DHKKJXdFsKnx0py4MLk";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export const fetchTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
