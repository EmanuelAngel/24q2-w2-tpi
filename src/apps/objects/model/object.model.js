import axios from 'axios';
import URL from '../../config/url.js';

export class ObjectModel {
  static async get(
    page = 1,
    limit = 20,
    departmentId = '',
    geolocation = '',
    q = ''
  ) {
    const department = departmentId ? `&departmentId=${departmentId}` : '';
    const location = geolocation ? `&geolocation=${geolocation}` : '';
    const keyword = q ? `q=${q}` : '';

    try {
      console.log('URL:', `${URL}search?${department}${location}${keyword}`);

      const objects = await axios
        .get(`${URL}search?${department}${location}${keyword}`)
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
          objects: objectDetails,
        };
      } else {
        console.error('No objects found.');
        return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
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

  static async getByDepartment(page = 1, limit = 20, departmentId) {
    try {
      const objects = await axios
        .get(`${URL}objects?departmentIds=${departmentId}`)
        .then((response) => response.data.objectIDs);

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);
        const promises = paginatedObjects.map((id) =>
          axios.get(`${URL}objects/${id}`).then((response) => response.data)
        );

        const objectDetails = await Promise.all(promises);
        return {
          total: objects.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(objects.length / limit),
          objects: objectDetails,
        };
      } else {
        console.error('No objects found in this department.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByLocation(page = 1, limit = 20, geolocation) {
    try {
      console.log('Entering getByLocation');

      return { message: 'getByLocation not implemented yet' };

      // const objects = await axios
      //   .get(`${URL}objects`) // <- Inevitable. API doesn't allow to search by location.
      //   .then((response) => response.data.objectIDs);

      // if (objects && objects.length > 0) {
      //   const startIndex = (page - 1) * limit;
      //   const endIndex = startIndex + limit;
      //   const paginatedObjects = objects.slice(startIndex, endIndex);
      //   const promises = paginatedObjects.map((id) =>
      //     axios.get(`${URL}objects/${id}`).then((response) => response.data)
      //   );

      //   const objectDetails = await Promise.all(promises);
      //   return {
      //     total: objects.length,
      //     page: page,
      //     limit: limit,
      //     totalPages: Math.ceil(objects.length / limit),
      //     objects: objectDetails,
      //   };
      // } else {
      //   console.error('No objects found in this department.');
      //   return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      // }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}
