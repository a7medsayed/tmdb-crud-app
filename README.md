🎬 
# TMDB Movie API
A complete NestJS-based REST API to manage and sync movie data with TMDB. Includes features like watchlists, user ratings, pagination, Redis caching, MongoDB storage, and JWT authentication—all wrapped in a Dockerized environment.

✅ 
# Features

🔄 Sync with TMDB API

🧾 MongoDB for persistent storage

🧾 Add to favorite list

🧾 Add to watch list

✅ rate movie

🔐 JWT-based user authentication

⚡ Redis-based caching

🐳 Docker + Docker Compose support

📑 Auto-generated Swagger documentation


🔄 
# Sync Movies from TMDB
To sync the latest movies from TMDB, follow these steps:

Login as Admin
Use the following admin credentials to authenticate and obtain a JWT token:

{
  "email": "ahmedsayed@gmail.com",
  "password": "12345"
}

# Movies list genre filter
 genre list
 [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'ScienceFiction',
  'TVMovie',
  'Thriller',
  'War',
  'Western',
];


📦 Environment Variables
Set these variables in a .env file (for local development) or rely on Docker Compose to inject them.

.env (Sample)
env
Copy
Edit
# App
PORT=3000

# MongoDB
MONGODB_CONNECTION_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tmdb
MONGOOSE_DEBUG=true

# TMDB
TMDB_URL=https://api.themoviedb.org/3
TMDB_KEY=your_tmdb_api_key

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRESIN=10h

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
🔒 Do not commit .env to version control.


# Run
docker-compose up --build


This will:

Build the NestJS app

Start Redis

Connect to MongoDB using the connection string

Expose the API on: http://localhost:8080

📘 
# Swagger API Docs
After the app is running, view interactive documentation at:

http://localhost:8080/docs



📫 
# Postman Collection

You can test the API using the official Postman collection:

👉 [Click here to open Postman Collection](https://lively-flare-406131.postman.co/workspace/Team-Workspace~9567830d-455b-4f82-83cb-9e559dc2ee26/collection/30527112-2efb71f9-d955-45d5-8b40-638c20461a5d?action=share&creator=30527112)

