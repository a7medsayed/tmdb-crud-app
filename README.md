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


🔄 Sync Movies from TMDB
To sync the latest movies from TMDB, follow these steps:

Login as Admin
Use the following admin credentials to authenticate and obtain a JWT token:

json
Copy
Edit
{
  "email": "ahmedsayed@gmail.com",
  "password": "12345"
}


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

👉 [Click here to open Postman Collection](https://ahmedsayed1712-5849546.postman.co/workspace/My-Workspace~56646d9d-b91d-44aa-a686-1f245e94f620/collection/47381456-268faf7e-7d5f-44e7-80eb-57757a05e3fc?action=share&creator=47381456)

