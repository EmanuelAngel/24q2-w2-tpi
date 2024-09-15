import { buildUrl } from '../../../utils/buildUrl.js';
import { translateObjects as translate } from '../../../utils/translate.js';

export class ObjectController {
  constructor({ objectModel }) {
    this.objectModel = objectModel;
  }

  getById = async (req, res) => {
    try {
      const object = await this.objectModel.getById(req.params.id);

      if (!object) {
        return res.status(404).render('404', { message: 'Object not found' });
      }

      console.log(object);
      res.render('details', { object });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  get = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const { departmentId = '', geolocation = '', q = '' } = req.query;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        message: 'Page and limit must be positive integers.',
      });
    }

    if (!departmentId && !geolocation && !q) {
      return res.status(400).json({
        message: 'Not enough parameters provided for search.',
      });
    }

    try {
      const baseUrl =
        'https://collectionapi.metmuseum.org/public/collection/v1/search';
      const url = buildUrl(baseUrl, { departmentId, geolocation, q });

      console.log('From controller, URL:', url);

      let objects = await this.objectModel.get(page, limit, url);

      const translatedObjects = await translate(objects.objects);

      objects = {
        ...objects,
        objects: translatedObjects,
      };

      res.render('art', {
        ...objects,
        queryParams: { departmentId, geolocation, q },
      });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };
}
