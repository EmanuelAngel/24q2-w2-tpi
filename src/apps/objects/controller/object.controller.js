export class ObjectController {
  constructor({ objectModel }) {
    this.objectModel = objectModel;
  }

  getById = async (req, res) => {
    try {
      const object = await this.objectModel.getById(req.params.id);
      res.json(object);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  get = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const { departmentId = '', geolocation = '', q = '' } = req.query;

    // For testing
    if (!departmentId && !geolocation && !q) {
      return res.status(400).json({
        message: 'Not enough parameters provided for search.',
      });
    }

    try {
      let objects;

      // Definir las funciones de búsqueda según las combinaciones de parámetros
      if (departmentId && geolocation && q) {
        objects = await this.objectModel.getByAll(
          page,
          limit,
          departmentId,
          geolocation,
          q
        );
      } else if (departmentId && geolocation) {
        objects = await this.objectModel.getByDepartmentAndLocation(
          page,
          limit,
          departmentId,
          geolocation
        );
      } else if (departmentId && q) {
        objects = await this.objectModel.getByDepartmentAndKeyword(
          page,
          limit,
          departmentId,
          q
        );
      } else if (geolocation && q) {
        objects = await this.objectModel.getByLocationAndKeyword(
          page,
          limit,
          geolocation,
          q
        );
      } else if (departmentId) {
        objects = await this.objectModel.getByDepartment(
          page,
          limit,
          departmentId
        );
      } else if (geolocation) {
        objects = await this.objectModel.getByLocation(
          page,
          limit,
          geolocation
        );
      } else if (q) {
        objects = await this.objectModel.getByKeyword(page, limit, q);
      }

      res.render('index', { objects });
      // res.json(objects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
