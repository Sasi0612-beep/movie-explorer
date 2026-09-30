import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const tmdb = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
});

tmdb.interceptors.request.use((config) => {
  if (!API_KEY) {
    throw new Error(
      "TMDb API key is missing. Create a .env file with REACT_APP_TMDB_API_KEY."
    );
  }

  config.params = {
    ...(config.params || {}),
    api_key: API_KEY
  };

  return config;
});

export async function getTrendingMovies() {
  const response = await tmdb.get("/trending/movie/week");
  return response.data;
}

export async function searchMovies(query, page = 1, filters = {}) {
  const params = {
    query,
    page,
    include_adult: false,
    ...(filters.year ? { primary_release_year: filters.year } : {})
  };

  const response = await tmdb.get("/search/movie", { params });
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,videos"
    }
  });
  return response.data;
}

export async function getMovieGenres() {
  const response = await tmdb.get("/genre/movie/list");
  return response.data.genres;
}
