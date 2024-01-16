export const config = () => ({
  port: process.env.PORT || 3000,
  origin: process.env.CORS_ORIGIN,
  mongoConnectionString: process.env.MONGO_DB_CONNECTION,
});
