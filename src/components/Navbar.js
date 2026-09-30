import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import {
  DarkMode,
  Favorite,
  LightMode,
  Logout,
  Movie
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMovie } from "../context/MovieContext";

export default function Navbar() {
  const { user, favorites, mode, toggleTheme, logout } = useMovie();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1 }}>
        <Movie sx={{ mr: 0.5 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 800,
            flexGrow: 1
          }}
        >
          Movie Explorer
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Tooltip title="Favorites">
          <IconButton color="inherit" component={Link} to="/favorites">
            <Badge badgeContent={favorites.length} color="secondary">
              <Favorite />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {user?.username}
          </Typography>
        </Box>

        <Tooltip title="Logout">
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
