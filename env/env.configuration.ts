export const EnvironmentVariables = () => ({
  port: parseInt(process.env?.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV,
  tmdb: {
    baseUrl: process.env.TMDB_URL,
    apiKey: process.env.TMDB_KEY,
  },
});
