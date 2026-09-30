# 🎬 Movie Explorer – Loons Lab Developer Selection Test

A responsive React-based movie discovery application built using the TMDb API. Users can explore trending movies, search for movies, view detailed movie information, manage favorites, apply filters, and switch between light and dark themes.

## 🔗 Repository

[GitHub Repository](https://github.com/Sasi0612-beep/movie-explorer)

---

## ✨ Features

### Required Features

- 🔐 User login interface with username/password
- 🔥 Trending movies from TMDb
- 🔎 Movie search
- 🎬 Responsive movie grid
- 🖼️ Movie posters and backdrops
- ⭐ Movie ratings
- 📅 Release year
- 📄 Movie details page
- 📝 Movie overview
- 🎭 Genres
- 👥 Cast information
- ▶️ YouTube trailer when available
- 🌙 Light/Dark mode
- ❤️ Favorite movies
- 💾 Favorites persisted using localStorage
- 🔎 Last searched movie persisted using localStorage
- ♾️ Infinite scrolling for search results
- ➕ Load More button
- ⚠️ User-friendly API error handling
- 📱 Mobile-first responsive design

### Bonus Features

- 🎭 Genre filtering
- 📅 Year filtering
- ⭐ Minimum rating filtering
- ➕ Load More button alongside infinite scrolling
- ▶️ Embedded YouTube trailer when available

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend application |
| React Router | Client-side routing |
| Axios | TMDb API requests |
| Material UI | UI components and responsive styling |
| React Context API | Global state management |
| TMDb API | Movie data and metadata |
| localStorage | Favorites, last search and theme persistence |
| JavaScript | Application logic |
| CSS | Additional styling |

---

## 📂 Project Structure

```text
movie-explorer/
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   └── tmdb.js
│   │
│   ├── components/
│   │   ├── LoadMore.js
│   │   ├── MovieCard.js
│   │   ├── MovieGrid.js
│   │   ├── Navbar.js
│   │   └── SearchBar.js
│   │
│   ├── context/
│   │   └── MovieContext.js
│   │
│   ├── pages/
│   │   ├── Favorites.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── MovieDetails.js
│   │
│   ├── App.js
│   ├── index.js
│   └── theme.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

##🚀 Getting Started
##Prerequisites

Make sure you have the following installed:

Node.js
npm
Git

A current LTS version of Node.js is recommended.

📥 Installation
1. Clone the repository
git clone https://github.com/Sasi0612-beep/movie-explorer.git
2. Navigate to the project
cd movie-explorer
3. Install dependencies
npm install

##🔑 Environment Variables

The application requires a TMDb API key.

Create a .env file in the project root:

REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY

You can use .env.example as a reference.

Important

##Do not commit the .env file to GitHub.

The .gitignore file is configured to exclude it.

##▶️ Run the Application

Start the development server:

npm start

The application will be available at:

http://localhost:3000

##🔐 Login

This project includes a simple client-side demo login interface.

Any non-empty username and password can be used to access the application.

This is intentionally implemented as a demo login because the assignment requires a login interface and does not include a backend authentication service.

**Note:** This is not production-grade authentication.

##🎬 TMDb API

The application uses TMDb endpoints for:

Trending movies
Movie search
Movie details
Movie genres
Movie credits/cast
Movie videos/trailers

Movie posters and backdrops are loaded using TMDb image URLs.

##🔄 Application Flow
Login
   ↓
Home Page
   ↓
Trending Movies
   ↓
Search / Filters
   ↓
Movie Grid
   ↓
Movie Details
   ↓
Overview + Genres + Cast + Trailer
   ↓
Add to Favorites
   ↓
Favorites Page

##💾 Local Storage

The application uses browser localStorage to persist:

Favorite movies
Last searched movie
Light/Dark theme preference

This allows selected user preferences to remain available after refreshing the browser.

##🎨 Theme Support

The application supports:

☀️ Light mode
🌙 Dark mode

The selected theme preference is stored in localStorage.

##📱 Responsive Design

The application follows a mobile-first responsive design approach.

The UI is designed to work across:

📱 Mobile devices
📲 Tablets
💻 Laptops
🖥️ Desktop screens
♾️ Movie Loading

Movie results can be loaded using:

Infinite scrolling
Load More button

This allows users to progressively browse through larger sets of movie results without loading everything at once.

⚠️ Error Handling

The application provides user-friendly error handling for common API issues, including:

Failed API requests
Invalid API responses
No search results
Missing movie information
Missing trailers
🏗️ Production Build

##To create a production build:

npm run build

The optimized production files will be generated in:

build/
##☁️ Deployment
Vercel
Import the GitHub repository into Vercel.
Select the movie-explorer repository.
Add the environment variable:
REACT_APP_TMDB_API_KEY
Enter your TMDb API key as the value.
Deploy the application.
Netlify
Import the GitHub repository into Netlify.
Set the build command:
npm run build
Set the publish directory:
build
Add the environment variable:
REACT_APP_TMDB_API_KEY
Deploy the application.

##📸 Screenshots

Screenshots can be added here to demonstrate the main application screens.

Suggested screenshots:

Login
Home / Trending Movies
Search Results
Movie Details
Favorites
Dark Mode
Mobile View

Example:

![Home](screenshots/home.png)

##🧪 Before Submission Checklist
 Application runs successfully with npm start
 Login works
 Trending movies load
 Movie search works
 Search results load correctly
 Infinite scrolling works
 Load More works
 Genre filter works
 Year filter works
 Minimum rating filter works
 Movie details page works
 Movie overview is displayed
 Genres are displayed
 Cast information is displayed
 YouTube trailer works when available
 Favorite add/remove works
 Favorites persist after refresh
 Last search persists after refresh
 Light/Dark mode works
 Theme preference persists after refresh
 Mobile responsiveness tested
 npm run build completes successfully
 .env is not committed
 TMDb API key is stored as an environment variable
 Application deployed successfully
 Live URL added to this README
 Complete source code pushed to GitHub
 
##🔒 Security Note

This is a frontend-only application, so the TMDb API key used by the client is accessible in the browser.

The .env file is excluded from version control and should never be committed to the repository.

For a production architecture, TMDb requests could be routed through a backend service where appropriate security controls can be applied.

##🎞️ TMDb Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie data and images are provided by TMDB.

For more information:

https://www.themoviedb.org/

##👨‍💻 Author

Sasi Priya

GitHub:

https://github.com/Sasi0612-beep
