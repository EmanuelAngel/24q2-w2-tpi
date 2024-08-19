import Router from 'express';
import { ObjectController } from '../controller/object.controller.js';

export const createObjectRouter = ({ objectModel }) => {
  const router = Router();

  const objectController = new ObjectController({ objectModel });

  router.get('/', objectController.get);
  // router.get('/:id', objectController.getById);
  // router.get('/department/:id', objectController.getByDepartment);
  // router.get('/location', objectController.getByLocation);
  // router.get('/keyword/:key', objectController.getByKeyword);

  return router;
};
