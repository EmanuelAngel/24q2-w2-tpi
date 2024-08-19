import express from 'express';
import corsMiddleware from './middlewares/cors.js';
import setUpMiddlewares from './middlewares/setup.js';
import { createObjectRouter } from './apps/objects/router/object.routes.js';

export default function createApp({ objectModel }) {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  // https://collectionapi.metmuseum.org/public/collection/v1/search?q=a&geolocation=france&departmentId=4
  app.use('/objects', createObjectRouter({ objectModel }));

  app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ message: err.message });
  });

  return app;
}
