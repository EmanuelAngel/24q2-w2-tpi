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
      const objects = await axios
        .get(url)
        .then((response) => response.data.objectIDs);

      if (objects && objects.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedObjects = objects.slice(startIndex, endIndex);

        const promises = paginatedObjects.map((id) =>
          axios
            .get(`${URL}objects/${id}`)
            .then((response) => response.data)
            .catch(() => ({
              title: 'Could not found object',
              culture: '',
              dynasty: '',
              objectDate: '',
              additionalImages: [],
              error: true,
            }))
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
        console.warn('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}
