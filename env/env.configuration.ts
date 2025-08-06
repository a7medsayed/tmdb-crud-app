export const EnvironmentVariables = () => ({
  port: parseInt(process.env?.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV,
  mongodb: {
    connectionUrl: process.env.MONGODB_CONNECTION_URL,
    mongooseDebug: process.env.MONGOOSE_DEBUG,
  },
  tmdb: {
    baseUrl: process.env.TMDB_URL,
    apiKey: process.env.TMDB_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
