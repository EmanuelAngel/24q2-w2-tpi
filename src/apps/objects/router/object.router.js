import Router from 'express';
import { ObjectController } from '../controller/object.controller.js';

const object = Router();

const objectController = new ObjectController();

object.get('/', objectController.getAll);
object.get('/:id', objectController.getById);
object.get('/department/:id', objectController.getByDepartment);
object.get('/location', objectController.getByLocation);
object.get('/keyword/:key', objectController.getByKeyword);

export default object;
