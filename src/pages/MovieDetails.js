import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { ArrowBack, Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { BACKDROP_BASE_URL, IMAGE_BASE_URL, getMovieDetails } from "../api/tmdb";
import { useMovie } from "../context/MovieContext";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/500x750?text=No+Poster";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovie();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieDetails(id);
        if (active) setMovie(data);
      } catch (err) {
        console.error(err);
        if (active) {
          setError(
            "Unable to load movie details. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  const trailer = useMemo(() => {
    const videos = movie?.videos?.results || [];

    return (
      videos.find(
        (item) =>
          item.site === "YouTube" &&
          item.type === "Trailer" &&
          item.official
      ) ||
      videos.find(
        (item) =>
          item.site === "YouTube" && item.type === "Trailer"
      ) ||
      videos.find((item) => item.site === "YouTube")
    );
  }, [movie]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error || "Movie not found."}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Container>
    );
  }

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_IMAGE;

  return (
    <Box>
      {backdrop && (
        <Box
          sx={{
            minHeight: 300,
            backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(11,13,16,.98)), url(${backdrop})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      )}

      <Container maxWidth="lg" sx={{ mt: backdrop ? -18 : 4, pb: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ color: "white", mb: 2 }}
        >
          Back
        </Button>

        <Paper sx={{ p: { xs: 2, md: 4 }, position: "relative" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} md={3}>
              <Box
                component="img"
                src={poster}
                alt={movie.title}
                sx={{
                  width: "100%",
                  maxWidth: 320,
                  display: "block",
                  mx: "auto",
                  borderRadius: 2
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h4">
                    {movie.title}
                  </Typography>
                  {movie.tagline && (
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {movie.tagline}
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    icon={<Star />}
                    label={`${Number(movie.vote_average || 0).toFixed(1)} / 10`}
                  />
                  <Chip label={movie.release_date || "Release date N/A"} />
                  <Chip label={`${movie.runtime || "N/A"} min`} />
                  {movie.genres?.map((genre) => (
                    <Chip key={genre.id} label={genre.name} variant="outlined" />
                  ))}
                </Stack>

                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {movie.overview || "No overview available."}
                </Typography>

                <Button
                  variant={isFavorite(movie.id) ? "contained" : "outlined"}
                  color="secondary"
                  startIcon={
                    isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />
                  }
                  onClick={() => toggleFavorite(movie)}
                  sx={{ alignSelf: "flex-start" }}
                >
                  {isFavorite(movie.id)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </Button>

                <Divider />

                <Typography variant="h6">Top cast</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {(movie.credits?.cast || []).slice(0, 10).map((person) => (
                    <Chip
                      key={`${person.id}-${person.character}`}
                      label={`${person.name} as ${person.character || "role"}`}
                      variant="outlined"
                    />
                  ))}
                </Stack>

                {trailer && (
                  <>
                    <Divider />
                    <Typography variant="h6">Trailer</Typography>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "56.25%",
                        borderRadius: 2,
                        overflow: "hidden"
                      }}
                    >
                      <iframe
                        title={`${movie.title} trailer`}
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: 0
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
