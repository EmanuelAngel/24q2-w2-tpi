export class ObjectController {
  constructor({ objectModel }) {
    this.objectModel = objectModel;
  }

  get = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const departmentId = req.query.departmentId || '';
    const geolocation = req.query.geolocation || '';
    const q = req.query.q || '';

    try {
      let objects;

      // If departmentId is provided, but not geolocation or q
      if (departmentId && !geolocation && !q) {
        objects = await this.objectModel.getByDepartment(
          page,
          limit,
          departmentId
        );
      }

      // If geolocation is provided, but not departmentId or q
      else if (geolocation && !departmentId && !q) {
        objects = await this.objectModel.getByLocation(
          page,
          limit,
          geolocation
        );
      }

      // If q is provided, or q and any other parameter
      else if (q) {
        objects = await this.objectModel.get(
          page,
          limit,
          departmentId,
          geolocation,
          q
        );
      }

      // If departmentId and geolocation are provided, but NOT q
      else if (departmentId && geolocation && !q) {
        objects = await this.objectModel.getByDepartmentLocation(
          page,
          limit,
          departmentId,
          geolocation
        );
      }

      // If no parameters are provided, do nothing and return 400
      else {
        return res.status(400).json({
          message:
            'No se proporcionaron parámetros suficientes para realizar una búsqueda.',
        });
      }

      res.json(objects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const object = await this.objectModel.getById(req.params.id);
      res.json(object);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // getByDepartment = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     console.log(req);
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 20;
  //     console.log(page, limit);
  //     const objects = await this.objectModel.getByDepartment(id, page, limit);
  //     res.json(objects);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  // getByLocation = async (req, res) => {
  //   try {
  //     const country = req.query.country;
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 20;
  //     const objects = await this.objectModel.getByLocation(
  //       country,
  //       page,
  //       limit
  //     );
  //     res.json(objects);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  // getByKeyword = async (req, res) => {
  //   try {
  //     const key = encodeURIComponent(req.params.key);
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 20;
  //     const objects = await this.objectModel.getByKeyword(key, page, limit);
  //     res.json(objects);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
}
