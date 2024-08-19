import express from 'express';

export default function setUpMiddlewares(app) {
  app.use(express.static('../public'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.set('view engine', 'pug');
  app.set('views', './views');

  return app;
}
