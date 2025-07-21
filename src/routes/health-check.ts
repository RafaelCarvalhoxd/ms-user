import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response) {
  const timeoutMs = 5000;

  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(503).send({
        status: 'TIMEOUT',
        message: `Health check exceeded ${timeoutMs}ms limit`,
      });
    }
  }, timeoutMs);

  try {
    const uptimeSeconds = process.uptime();
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    clearTimeout(timeout);

    res.status(200).send({
      status: 'UP',
      timestamp: new Date().toISOString(),
      message: '✅ Service is running',
      uptime: `${hours}h ${minutes}m ${seconds}s`,
      service: process.env.npm_package_name || 'unknown-service',
    });
  } catch (error) {
    clearTimeout(timeout);

    res.status(500).send({
      status: 'DOWN',
      message: '❌ Service is not available',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
