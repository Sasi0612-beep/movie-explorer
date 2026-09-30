import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/tmdb";
import { useMovie } from "../context/MovieContext";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/500x750?text=No+Poster";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovie();
  const favorite = isFavorite(movie.id);

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  function handleFavorite(event) {
    event.stopPropagation();
    toggleFavorite(movie);
  }

  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <CardActionArea
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <CardMedia
          component="img"
          image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_IMAGE}
          alt={movie.title}
          sx={{ aspectRatio: "2 / 3", objectFit: "cover" }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {movie.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
            <Chip size="small" label={year} />
            <Chip
              size="small"
              icon={<Star fontSize="small" />}
              label={Number(movie.vote_average || 0).toFixed(1)}
            />
          </Stack>
        </CardContent>
      </CardActionArea>

      <IconButton
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        onClick={handleFavorite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(0,0,0,.65)",
          color: "white",
          "&:hover": { bgcolor: "rgba(0,0,0,.8)" }
        }}
      >
        {favorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
}
