import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { setUpMiddlewares } from './middlewares/setup.js';
import { createObjectRouter } from './apps/objects/router/object.routes.js';

export default function createApp({ objectModel }) {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.use('/', createObjectRouter({ objectModel }));

  app.use((req, _, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, _) => {
    console.error('Global Error Handler:', err);

    if (err.status === 404) {
      return res.status(404).render('404', { url: req.originalUrl });
    }

    res.status(err.status || 500).json({ message: err.message });
  });

  return app;
}
