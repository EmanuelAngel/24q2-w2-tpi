import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { setUpMiddlewares } from './middlewares/setup.js';

export default function createApp() {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });
  app.use((req, res) => {
    res.render('./errors/404', { title: '404' });
  });

  return app;
}
