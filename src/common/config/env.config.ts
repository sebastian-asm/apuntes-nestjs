export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'env',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: process.env.DEFAULT_LIMIT || 10,
})
