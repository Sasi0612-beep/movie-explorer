# Movie Explorer – Loons Lab Developer Selection Test

A React movie discovery application built according to the assignment requirements.

## Features

### Required
- User login interface with username/password
- Trending movies from TMDb
- Movie search
- Responsive movie grid with poster, title, year and rating
- Movie details page
- Overview, genres, cast and YouTube trailer when available
- Light/dark mode
- React Context API for state management
- Last searched movie persisted in localStorage
- Favorite movies persisted in localStorage
- Infinite scrolling for search results
- User-friendly API error handling
- React Router pages: Home, Movie Details and Favorites
- Axios for API requests
- Material UI for styling
- Mobile-first responsive layout

### Bonus
- Genre filter
- Year filter
- Minimum rating filter
- "Load more" button in addition to infinite scroll
- YouTube trailer embedded from TMDb video results

## Tech Stack

- React
- React Router
- Axios
- Material UI
- Context API
- TMDb API
- localStorage

## Setup

### 1. Install Node.js

Use a current LTS Node.js version compatible with Create React App.

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Copy `.env.example` to `.env` and add your TMDb v3 API key:

```env
REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

Do not commit `.env` to Git.

### 4. Start locally

```bash
npm start
```

Open:

http://localhost:3000

### 5. Login

This assignment implementation uses a simple client-side demo login. Any non-empty username and password are accepted.

This is intentionally not a production authentication system because the assignment asks for a login interface rather than a backend authentication service.

## TMDb

The app uses TMDb endpoints for:
- Trending movies
- Movie search
- Movie details
- Genres
- Credits
- Videos

TMDb image URLs are used for movie posters/backdrops.

## Production build

```bash
npm run build
```

The generated production files are placed in `build/`.

## Deployment

### Vercel

1. Push this project to GitLab/GitHub.
2. Import the repository into Vercel.
3. Add the environment variable:
   `REACT_APP_TMDB_API_KEY`
4. Deploy.

### Netlify

1. Push the repository to GitLab/GitHub.
2. Import the repository into Netlify.
3. Build command:
   `npm run build`
4. Publish directory:
   `build`
5. Add:
   `REACT_APP_TMDB_API_KEY`
6. Deploy.

## Suggested Git structure

```text
movie-explorer/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── tmdb.js
│   ├── components/
│   │   ├── LoadMore.js
│   │   ├── MovieCard.js
│   │   ├── MovieGrid.js
│   │   ├── Navbar.js
│   │   └── SearchBar.js
│   ├── context/
│   │   └── MovieContext.js
│   ├── pages/
│   │   ├── Favorites.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── MovieDetails.js
│   ├── api/
│   │   └── tmdb.js
│   ├── App.js
│   ├── index.js
│   └── theme.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Before submission

- Confirm the application runs with `npm start`
- Confirm login works
- Confirm trending movies load
- Search for a movie
- Scroll to trigger additional results
- Test filters
- Open a movie details page
- Test favorite add/remove
- Refresh and verify favorites persist
- Verify last search persists
- Test light/dark mode
- Test on mobile viewport
- Run `npm run build`
- Deploy to Vercel/Netlify
- Add live URL to the repository README
- Push the complete source code to GitLab

## Security note

The TMDb API key is exposed to the browser because this is a frontend-only assignment. For a real production application, proxy TMDb requests through a backend so the secret is not exposed client-side.
