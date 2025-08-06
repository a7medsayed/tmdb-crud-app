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


🐳 
# Docker Compose Setup
yaml
Copy
Edit
version: "3.8"

services:
  app:
    build: .
    ports:
      - "8080:3000"
    environment:
      - NODE_ENV=prod
      - PORT=3000
      - MONGODB_CONNECTION_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tmdb
      - MONGOOSE_DEBUG=true
      - TMDB_URL=https://api.themoviedb.org/3
      - TMDB_KEY=your_tmdb_api_key
      - JWT_SECRET=your_jwt_secret
      - JWT_EXPIRESIN=10h
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - redis
    command: ./run.sh

  redis:
    image: redis:7
    restart: always
🐋 Dockerfile
dockerfile
Copy
Edit
FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --force

# Copy app source
COPY . .

RUN npm run build
RUN chmod +x run.sh

EXPOSE 3000

CMD ["./run.sh"]
🚀 How to Run the App
With Docker Compose
bash
Copy
Edit


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

👉 [Click here to open Postman Collection](https://lively-flare-406131.postman.co/workspace/New-Team-Workspace~24785804-3482-4974-980d-63f042490384/collection/30527112-65c09332-c8db-4d8e-8cb8-0f6418aaeea8?action=share&creator=30527112&active-environment=30527112-4d5e9cd9-1127-4354-a7af-3ad80cbe33c7)

