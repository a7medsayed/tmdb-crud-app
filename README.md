# 🎬 TMDB Movie API

A production-ready NestJS REST API for managing movie data with TMDB synchronization. Features watchlists, user ratings, authentication, and high-performance caching.

## ✨ Features

- **TMDB API Integration** - Sync with The Movie Database
- **MongoDB** - Persistent data storage
- **JWT Authentication** - Secure user management
- **Redis Caching** - Improved performance for frequent requests
- **Dockerized** - Easy deployment with Docker Compose
- **Swagger Documentation** - Interactive API documentation
- **Pagination Support** - Efficient data retrieval
- **TypeScript** - Strongly typed codebase
- **Modular Architecture** - Clean and maintainable structure

## 🛠️ Setup

### Prerequisites
- Docker and Docker Compose
- Node.js (if running locally)
- TMDB API key (free tier available)

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

# MongoDB
MONGODB_CONNECTION_URL=mongodb://localhost:27017/tmdb
MONGOOSE_DEBUG=true

# TMDB
TMDB_URL=https://api.themoviedb.org/3
TMDB_KEY=your_tmdb_api_key_here

# JWT Auth
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRESIN=10h

# Redis
REDIS_HOST=redis
REDIS_PORT=6379