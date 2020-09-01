// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): any => ({
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  mongoDbName: process.env.MONGO_DB_NAME,
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  env: process.env.NODE_ENV
});
