import { config } from 'dotenv';

config();

const requiredEnvVars = [
  'SERVER_PORT',
  'DB_POSTGRES_HOST',
  'DB_POSTGRES_PORT',
  'DB_POSTGRES_USER',
  'DB_POSTGRES_PASSWORD',
  'DB_POSTGRES_NAME',
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export default {
  server: {
    port: parseInt(process.env.SERVER_PORT || '3000', 10),
  },
  db: {
    postgres: {
      host: process.env.DB_POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.DB_POSTGRES_PORT || '5432', 10),
      user: process.env.DB_POSTGRES_USER || 'user',
      password: process.env.DB_POSTGRES_PASSWORD || 'password',
      database: process.env.DB_POSTGRES_NAME || 'database',
    },
  },
  grpc: {
    host: process.env.GRPC_HOST || 'localhost',
    port: parseInt(process.env.GRPC_PORT || '50051', 10),
  },
};
