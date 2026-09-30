import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getMovieGenres,
  getTrendingMovies,
  searchMovies
} from "../api/tmdb";

const MovieContext = createContext(null);

const USER_KEY = "movie_explorer_user";
const FAVORITES_KEY = "movie_explorer_favorites";
const LAST_SEARCH_KEY = "movie_explorer_last_search";
const THEME_KEY = "movie_explorer_theme";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function MovieProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(USER_KEY, null));
  const [favorites, setFavorites] = useState(() => readStorage(FAVORITES_KEY, []));
  const [lastSearch, setLastSearch] = useState(
    () => readStorage(LAST_SEARCH_KEY, "")
  );
  const [mode, setMode] = useState(
    () => readStorage(THEME_KEY, "dark")
  );

  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [trendingError, setTrendingError] = useState("");
  const [searchMeta, setSearchMeta] = useState({
    query: "",
    page: 0,
    totalPages: 0,
    totalResults: 0
  });

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LAST_SEARCH_KEY, JSON.stringify(lastSearch));
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    async function loadInitialData() {
      setLoadingTrending(true);
      setTrendingError("");

      try {
        const [trendingData, genreData] = await Promise.all([
          getTrendingMovies(),
          getMovieGenres()
        ]);

        setTrending(trendingData.results || []);
        setGenres(genreData || []);
      } catch (error) {
        console.error(error);
        setTrendingError(
          "Unable to load trending movies. Please check your TMDb API key and network connection."
        );
      } finally {
        setLoadingTrending(false);
      }
    }

    loadInitialData();
  }, []);

  function login(username, password) {
    if (!username.trim() || !password.trim()) {
      return { ok: false, message: "Username and password are required." };
    }

    const account = {
      username: username.trim(),
      loggedInAt: new Date().toISOString()
    };

    setUser(account);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  function toggleTheme() {
    setMode((current) => (current === "dark" ? "light" : "dark"));
  }

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  function toggleFavorite(movie) {
    setFavorites((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current.filter((item) => item.id !== movie.id);
      }

      return [...current, movie];
    });
  }

  async function performSearch(query, filters = {}, page = 1, append = false) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      setMovies([]);
      setSearchMeta({
        query: "",
        page: 0,
        totalPages: 0,
        totalResults: 0
      });
      setSearchError("");
      return;
    }

    setLoadingSearch(true);
    setSearchError("");

    try {
      const data = await searchMovies(cleanQuery, page, filters);
      const results = data.results || [];

      const filtered = results.filter((movie) => {
        const ratingMatches =
          !filters.rating || Number(movie.vote_average || 0) >= Number(filters.rating);

        const genreMatches =
          !filters.genre ||
          (movie.genre_ids || []).includes(Number(filters.genre));

        const yearMatches =
          !filters.year ||
          (movie.release_date || "").startsWith(String(filters.year));

        return ratingMatches && genreMatches && yearMatches;
      });

      setMovies((current) => (append ? [...current, ...filtered] : filtered));
      setSearchMeta({
        query: cleanQuery,
        page: data.page || page,
        totalPages: data.total_pages || 0,
        totalResults: data.total_results || 0
      });

      setLastSearch(cleanQuery);
    } catch (error) {
      console.error(error);
      setSearchError(
        "We couldn't complete the search. Please try again in a moment."
      );
    } finally {
      setLoadingSearch(false);
    }
  }

  const value = useMemo(
    () => ({
      user,
      favorites,
      lastSearch,
      mode,
      trending,
      movies,
      genres,
      loadingTrending,
      loadingSearch,
      searchError,
      trendingError,
      searchMeta,
      login,
      logout,
      toggleTheme,
      isFavorite,
      toggleFavorite,
      performSearch
    }),
    [
      user,
      favorites,
      lastSearch,
      mode,
      isFavorite,
      trending,
      movies,
      genres,
      loadingTrending,
      loadingSearch,
      searchError,
      trendingError,
      searchMeta
    ]
  );

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovie must be used inside MovieProvider");
  }

  return context;
}
