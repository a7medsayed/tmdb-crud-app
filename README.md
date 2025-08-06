🎬 TMDB Movie API
A complete NestJS-based REST API to manage movie data, synced with TMDB. Includes support for watchlists, user ratings, pagination, Redis caching, MongoDB storage, and JWT authentication.

✅ Features
Sync with TMDB API

MongoDB for persistence

JWT-based user auth

Redis for caching

Dockerized environment

Swagger documentation

📦 Environment Variables
Below are the environment variables needed for the app. You can place them in a .env file (if running locally) or rely on Docker Compose to inject them.

Sample .env
env
Copy
Edit
PORT=3000

# MongoDB
MONGODB_CONNECTION_URL=mongodb+srv://a7madsayd:TgUVvuDItzuVTGh9@cluster0.wfsh0m5.mongodb.net/tmdb
MONGOOSE_DEBUG=true

# TMDB
TMDB_URL=https://api.themoviedb.org/3
TMDB_KEY=223723f95ef0e937659e113562e59550

# JWT Auth
JWT_SECRET=223723f95ef0e937659e113562e59550
JWT_EXPIRESIN=10h

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
🐳 Docker Compose Setup
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
      - MONGODB_CONNECTION_URL=mongodb+srv://a7madsayd:TgUVvuDItzuVTGh9@cluster0.wfsh0m5.mongodb.net/tmdb
      - MONGOOSE_DEBUG=true
      - TMDB_URL=https://api.themoviedb.org/3
      - TMDB_KEY=223723f95ef0e937659e113562e59550
      - JWT_SECRET=223723f95ef0e937659e113562e59550
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

# Copy source files
COPY . .

RUN npm run build
RUN chmod +x run.sh

EXPOSE 3000
CMD ["./run.sh"]
🚀 Run the App
With Docker Compose
bash
Copy
Edit
docker-compose up --build
This will:

Build the NestJS app

Start Redis

Connect MongoDB via connection string

Launch the API at: http://localhost:8080

📘 Swagger Docs
After running, access the API documentation here:

bash
Copy
Edit
http://localhost:8080/api
📂 Project Structure
arduino
Copy
Edit
tmdb-api/
├── src/
├── Dockerfile
├── docker-compose.yml
├── .env
├── run.sh
└── README.md
