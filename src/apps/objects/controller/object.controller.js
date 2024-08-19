export class ObjectController {
  constructor({ objectModel }) {
    this.objectModel = objectModel;
  }

  get = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const departmentId = req.query.departmentId || '';
      const geolocation = req.query.geolocation || '';
      const q = req.query.q || '';

      console.log(`Controller: get`);
      console.log(
        `Page: ${page}, Limit: ${limit}, Department ID: ${departmentId}, Geolocation: ${geolocation}, Query: ${q}`
      );

      const objects = await this.objectModel.get(
        page,
        limit,
        departmentId,
        geolocation,
        q
      );

      res.json(objects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // getById = async (req, res) => {
  //   try {
  //     const object = await this.objectModel.getById(req.params.id);
  //     res.json(object);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

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
