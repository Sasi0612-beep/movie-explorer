import React from "react";
import { Container, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovie } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovie();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        My Favorites
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Movies you saved are stored locally in your browser.
      </Typography>

      <MovieGrid
        movies={favorites}
        loading={false}
        error={null}
        emptyMessage="You haven't saved any favorites yet."
      />
    </Container>
  );
}
