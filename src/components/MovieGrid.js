import React from "react";
import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  loading,
  error,
  emptyMessage = "No movies found."
}) {
  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!movies.length) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
