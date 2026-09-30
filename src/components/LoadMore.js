import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

export default function LoadMore({ visible, loading, onClick }) {
  if (!visible) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Button
        variant="outlined"
        onClick={onClick}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} /> : null}
      >
        {loading ? "Loading..." : "Load more"}
      </Button>
    </Box>
  );
}
