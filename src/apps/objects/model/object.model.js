import axios from 'axios';
import URL from '../../config/url.js';

export class ObjectModel {
  static async getAll(page = 1, limit = 20) {
    try {
      try {
        const objects = await axios
          .get(`${URL}/objects`)
          .then((response) => response.data.objectIDs);

        if (objects && objects.length > 0) {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedObjects = objects.slice(startIndex, endIndex);

          const promises = paginatedObjects.map((id) =>
            axios.get(`${URL}/objects/${id}`).then((response) => response.data)
          );

          const objectDetails = await Promise.all(promises);
          return {
            total: objects.length,
            page: page,
            limit: limit,
            totalPages: Math.ceil(objects.length / limit),
            objects: objectDetails
          };
        } else {
          console.error('No objects found.');
          return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
        }
      } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const object = await axios.get(`${URL}/objects/${id}`);
      return object.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByDepartment(departmentId, page = 1, limit = 20) {
    try {
      const objects = await axios
        .get(`${URL}/objects?departmentIds=${departmentId}`)
        .then((response) => response.data.objectIDs);

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);

        const promises = paginatedObjects.map((id) =>
          axios.get(`${URL}/objects/${id}`).then((response) => response.data)
        );

        const objectDetails = await Promise.all(promises);
        return {
          total: objects.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(objects.length / limit),
          objects: objectDetails
        };
      } else {
        console.error('No objects found in this department.');
        return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByLocation(country, page = 1, limit = 20) {
    try {
      const objects = await axios
        .get(`${URL}/objects?country=${encodeURIComponent(country)}`)
        .then((response) => response.data.objectIDs);

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);

        const promises = paginatedObjects.map((id) =>
          axios.get(`${URL}/objects/${id}`).then((response) => response.data)
        );

        const objectDetails = await Promise.all(promises);
        return {
          total: objects.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(objects.length / limit),
          objects: objectDetails
        };
      } else {
        console.error('No objects found in this country.');
        return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByKeyword(keyword, page = 1, limit = 20) {
    try {
      const objects = await axios
        .get(`${URL}/search?q=${encodeURIComponent(keyword)}`)
        .then((response) => response.data.objectIDs);

      page < 1 ? page : 1;
      limit < 1 ? limit : 20;

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);

        const promises = paginatedObjects.map((id) =>
          axios.get(`${URL}/objects/${id}`).then((response) => response.data)
        );

        const objectDetails = await Promise.all(promises);
        return {
          total: objects.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(objects.length / limit),
          objects: objectDetails
        };
      } else {
        console.error('No objects found matching the keyword.');
        return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}
