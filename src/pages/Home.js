import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import LoadMore from "../components/LoadMore";
import { useMovie } from "../context/MovieContext";

export default function Home() {
  const {
    trending,
    movies,
    loadingTrending,
    loadingSearch,
    searchError,
    trendingError,
    searchMeta,
    performSearch,
    lastSearch
  } = useMovie();

  const [searchMode, setSearchMode] = useState(Boolean(lastSearch));
  const [filters, setFilters] = useState({});
  const sentinelRef = useRef(null);

  async function handleSearch(query, selectedFilters) {
    setFilters(selectedFilters);
    setSearchMode(Boolean(query.trim()));
    await performSearch(query, selectedFilters, 1, false);
  }

  async function loadNextPage() {
    if (
      loadingSearch ||
      !searchMeta.query ||
      searchMeta.page >= searchMeta.totalPages
    ) {
      return;
    }

    await performSearch(
      searchMeta.query,
      filters,
      searchMeta.page + 1,
      true
    );
  }

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: "500px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [searchMeta.page, searchMeta.totalPages, searchMeta.query, filters, loadingSearch]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Discover your next favorite movie
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Search TMDb, explore trending films, and save your favorites.
        </Typography>

        <SearchBar onSearch={handleSearch} />
      </Box>

      {searchMode ? (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h5">
                Search results
              </Typography>
              <Typography color="text.secondary">
                {searchMeta.totalResults
                  ? `${searchMeta.totalResults.toLocaleString()} results`
                  : "No matching results"}
              </Typography>
            </Box>

            <Button
              variant="text"
              onClick={() => {
                setSearchMode(false);
                setFilters({});
              }}
            >
              Back to trending
            </Button>
          </Stack>

          <MovieGrid
            movies={movies}
            loading={loadingSearch}
            error={searchError}
            emptyMessage="No movies matched your search and filters."
          />

          <LoadMore
            visible={
              searchMeta.page > 0 &&
              searchMeta.page < searchMeta.totalPages
            }
            loading={loadingSearch}
            onClick={loadNextPage}
          />

          <Box ref={sentinelRef} sx={{ height: 1 }} />
        </>
      ) : (
        <>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Trending this week
          </Typography>

          {trendingError && <Alert severity="error">{trendingError}</Alert>}

          {loadingTrending ? (
            <Stack spacing={2}>
              <Skeleton variant="rectangular" height={420} />
            </Stack>
          ) : (
            <MovieGrid
              movies={trending}
              loading={false}
              error={null}
              emptyMessage="No trending movies available."
            />
          )}
        </>
      )}
    </Container>
  );
}
