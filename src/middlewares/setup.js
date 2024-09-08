import express from 'express'; // Importación de las librerías
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const setUpMiddlewares = (app) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static('./public'));
  app.set('view engine', 'pug');

  // Asegúrate de que la ruta apunte a 'views/pages'
  const viewsPath = path.join(__dirname, '../views/pages');
  console.log('Ruta de vistas:', viewsPath); // Depuración

  app.set('views', viewsPath); // Ruta a las vistas

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
};
