import axios from 'axios';
import URL from '../../config/url.js';

export class ObjectModel {
  static async getById(id) {
    try {
      const object = await axios.get(`${URL}/objects/${id}`);
      return object.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async get(page, limit, url) {
    try {
      console.log('Entering get');

      console.log('From model:', url);

      const objects = await axios
        .get(url)
        .then((response) => response.data.objectIDs);

      console.log('Finished getting objects');

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);

        // An idea: if a request fails, return a mock?
        // ...or something like that.
        const promises = paginatedObjects.map((id) =>
          axios.get(`${URL}objects/${id}`).then((response) => response.data)
        );

        const objectDetails = await Promise.all(promises);

        console.log('Object details:', objects.length);

        return {
          total: objects.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(objects.length / limit),
          objects: objectDetails,
        };
      } else {
        console.warn('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}
