import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { setUpMiddlewares } from './middlewares/setup.js';
import { createObjectRouter } from './apps/objects/router/object.routes.js';

export default function createApp({ objectModel }) {
  const app = express();

  corsMiddleware(app);
  setUpMiddlewares(app);

  app.get('/', (_, res) => {
    res.render('index');
  });

  app.use('/art', createObjectRouter({ objectModel }));

  app.use((_, res) => {
    res.status(404).render('404', { message: 'Not found' });
  });

  app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  return app;
}
