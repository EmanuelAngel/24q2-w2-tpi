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

      if (departmentId && !geolocation && !q) {
        // Si solo llega departmentId
        objects = await this.objectModel.getByDepartment(
          page,
          limit,
          departmentId
        );
      } else if (geolocation && !departmentId && !q) {
        // Si solo llega geolocation
        objects = await this.objectModel.getByLocation(
          page,
          limit,
          geolocation
        );
      } else if (q) {
        // Si llega q, o q y cualquier otro parámetro
        objects = await this.objectModel.get(
          page,
          limit,
          departmentId,
          geolocation,
          q
        );
      } else if (departmentId && geolocation && !q) {
        // Si solo llegan departmentId y geolocation, pero NO q
        objects = await this.objectModel.getByDepartmentLocation(
          page,
          limit,
          departmentId,
          geolocation
        );
      } else {
        // Si no se proporcionan parámetros suficientes, no hacer nada y retornar un 400
        return res
          .status(400)
          .json({
            message:
              'No se proporcionaron parámetros suficientes para realizar una búsqueda.',
          });
      }

      res.json(objects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // console.log(
  //   `Controller: get \n
  //   Page: ${page}, Limit: ${limit}, Department ID: ${
  //     departmentId || null
  //   }, Geolocation: ${geolocation || null}, Query: ${q || null}`
  // );

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
