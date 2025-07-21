import { Router } from 'express';
import { healthCheck } from '../../routes/health-check';

export const router = Router();

export function setupRoutes() {
  router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  router.get('/health', healthCheck);

  return router;
}
