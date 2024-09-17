import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const setUpMiddlewares = (app) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static('./public'));
  app.set('view engine', 'pug');

  const viewsPath = path.join(__dirname, '../../views/pages');

  app.set('views', viewsPath);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
};
