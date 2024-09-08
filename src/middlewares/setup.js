import express from 'express';

export const setUpMiddlewares = (app) => {
  app.use(express.static('./public'));

  app.set('view engine', 'pug');
  app.set('views', './src/views/pages');

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
};
