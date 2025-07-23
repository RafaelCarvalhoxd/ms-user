import express from 'express';
import env from '../env/env';
import { setupRoutes } from '@/config/server/setup-routes';
import '@/config/db/db';
import { startGrpcServer } from '../grpc/grpc';
import { errorHandler } from './error-handler';

const app = express();
const port = env.server.port;

app.use(express.json());
app.use('/api', setupRoutes());
app.use(errorHandler);
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

startGrpcServer();

export default app;
