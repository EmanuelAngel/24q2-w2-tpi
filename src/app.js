import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { setUpMiddlewares } from './middlewares/setup.js';
import { createObjectRouter } from './apps/objects/router/object.routes.js';

export default function createApp({ objectModel }) {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.use('/', createObjectRouter({ objectModel }));

  app.use((err, _, res, __) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ message: err.message });
  });

  return app;
}
