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
    const query = q ? `q=${q}` : '';
    const query2 = geolocation ? `&geolocation=${geolocation}` : '';
    const query3 = departmentId ? `&departmentId=${departmentId}` : '';

    try {
      console.log('URL:', `${URL}search?${query}${query2}${query3}`);

      const objects = await axios
        .get(`${URL}search?${query}${query2}${query3}`)
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

  // static async getById(id) {
  //   try {
  //     const object = await axios.get(`${URL}/objects/${id}`);
  //     return object.data;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // static async getByDepartment(departmentId, page = 1, limit = 20) {
  //   try {
  //     const objects = await axios
  //       .get(`${URL}/objects?departmentIds=${departmentId}`)
  //       .then((response) => response.data.objectIDs);

  //     if (objects && objects.length > 0) {
  //       const startIndex = (page - 1) * limit;
  //       const endIndex = startIndex + limit;
  //       const paginatedObjects = objects.slice(startIndex, endIndex);

  //       const promises = paginatedObjects.map((id) =>
  //         axios.get(`${URL}/objects/${id}`).then((response) => response.data)
  //       );

  //       const objectDetails = await Promise.all(promises);
  //       return {
  //         total: objects.length,
  //         page: page,
  //         limit: limit,
  //         totalPages: Math.ceil(objects.length / limit),
  //         objects: objectDetails,
  //       };
  //     } else {
  //       console.error('No objects found in this department.');
  //       return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     throw new Error(error.message);
  //   }
  // }

  // static async getByLocation(country, page = 1, limit = 20) {
  //   try {
  //     const objects = await axios
  //       .get(`${URL}/objects?country=${encodeURIComponent(country)}`)
  //       .then((response) => response.data.objectIDs);

  //     if (objects && objects.length > 0) {
  //       const startIndex = (page - 1) * limit;
  //       const endIndex = startIndex + limit;
  //       const paginatedObjects = objects.slice(startIndex, endIndex);

  //       const promises = paginatedObjects.map((id) =>
  //         axios.get(`${URL}/objects/${id}`).then((response) => response.data)
  //       );

  //       const objectDetails = await Promise.all(promises);
  //       return {
  //         total: objects.length,
  //         page: page,
  //         limit: limit,
  //         totalPages: Math.ceil(objects.length / limit),
  //         objects: objectDetails,
  //       };
  //     } else {
  //       console.error('No objects found in this country.');
  //       return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     throw new Error(error.message);
  //   }
  // }

  // static async getByKeyword(keyword, page = 1, limit = 20) {
  //   try {
  //     const objects = await axios
  //       .get(`${URL}/search?q=${keyword}`)
  //       .then((response) => response.data.objectIDs);

  //     page < 1 ? page : 1;
  //     limit < 1 ? limit : 20;

  //     if (objects && objects.length > 0) {
  //       const startIndex = (page - 1) * limit;
  //       const endIndex = startIndex + limit;
  //       const paginatedObjects = objects.slice(startIndex, endIndex);

  //       const promises = paginatedObjects.map((id) =>
  //         axios.get(`${URL}/objects/${id}`).then((response) => response.data)
  //       );

  //       const objectDetails = await Promise.all(promises);
  //       return {
  //         total: objects.length,
  //         page: page,
  //         limit: limit,
  //         totalPages: Math.ceil(objects.length / limit),
  //         objects: objectDetails,
  //       };
  //     } else {
  //       console.log('No objects found matching the keyword.');
  //       return { total: 0, page: 1, limit, totalPages: 0, objects: [] };
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     throw new Error(error.message);
  //   }
  // }
}
