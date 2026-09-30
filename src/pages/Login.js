import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../context/MovieContext";

export default function Login() {
  const { user, login } = useMovie();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  function submit(event) {
    event.preventDefault();

    const result = login(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 12 } }}>
      <Paper sx={{ p: { xs: 3, sm: 5 } }}>
        <Stack spacing={3} component="form" onSubmit={submit}>
          <Box sx={{ textAlign: "center" }}>
            <MovieIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h4" sx={{ mt: 1 }}>
              Welcome
            </Typography>
            <Typography color="text.secondary">
              Sign in to explore movies
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" size="large">
            Login
          </Button>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            Demo authentication: any non-empty username and password are accepted.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
