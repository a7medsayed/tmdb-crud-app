🎬 TMDB Movie API

A complete NestJS-based REST API to manage and sync movie data with TMDB. Includes features like watchlists, user ratings, pagination, Redis caching, MongoDB storage, and JWT authentication—all wrapped in a Dockerized environment.

✅ Features

🔄 Sync with TMDB API

🧾 MongoDB for persistent storage

🔐 JWT-based user authentication

⚡ Redis-based caching

🐳 Docker + Docker Compose support

📑 Auto-generated Swagger documentation

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


docker-compose up --build

This will:

Build the NestJS app

Start Redis

Connect to MongoDB using the connection string

Expose the API on: http://localhost:8080

📘 Swagger API Docs
After the app is running, view interactive documentation at:

http://localhost:8080/docs

📂 Project Structure
bash
Copy
Edit
tmdb-api/
├── src/                 # NestJS source code
├── Dockerfile
├── docker-compose.yml
├── .env                 # Environment variables
├── run.sh               # Start script
└── README.md