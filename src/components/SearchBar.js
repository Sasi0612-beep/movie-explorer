import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMovie } from "../context/MovieContext";

export default function SearchBar({ onSearch }) {
  const { lastSearch, genres } = useMovie();
  const [query, setQuery] = useState(lastSearch || "");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    setQuery(lastSearch || "");
  }, [lastSearch]);

  function submit(event) {
    event.preventDefault();
    onSearch(query, { genre, year, rating });
  }

  function clearFilters() {
    setGenre("");
    setYear("");
    setRating("");
    onSearch(query, {});
  }

  const years = Array.from({ length: 40 }, (_, index) => new Date().getFullYear() - index);

  return (
    <Box component="form" onSubmit={submit} sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        alignItems={{ md: "center" }}
      >
        <TextField
          fullWidth
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          label="Search movies"
          placeholder="e.g. Interstellar"
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.6 }} /> }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ minWidth: 130, height: 56 }}
        >
          Search
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ mt: 1.5 }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={(event) => setGenre(event.target.value)}
          >
            <MenuItem value="">All genres</MenuItem>
            {genres.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={(event) => setYear(event.target.value)}
          >
            <MenuItem value="">All years</MenuItem>
            {years.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Min rating</InputLabel>
          <Select
            value={rating}
            label="Min rating"
            onChange={(event) => setRating(event.target.value)}
          >
            <MenuItem value="">Any rating</MenuItem>
            {[5, 6, 7, 8, 9].map((item) => (
              <MenuItem key={item} value={item}>
                {item}+
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{ minWidth: 120 }}
        >
          Clear
        </Button>
      </Stack>
    </Box>
  );
}
