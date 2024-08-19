import express from 'express';
import corsMiddleware from './middlewares/cors.js';
import setUpMiddlewares from './middlewares/setup.js';
import objectRouter from './apps/objects/router/object.router.js';

export default function createApp() {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.use('/objects', objectRouter);

  app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ message: err.message });
  });

  return app;
}
