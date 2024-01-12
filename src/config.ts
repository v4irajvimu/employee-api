export const config = () => ({
  port: process.env.PORT || 3000,
  mongoConnectionString: process.env.MONGO_DB_CONNECTION,
});
