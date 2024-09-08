import axios from 'axios';
import URL from '../../config/url.js';

export class ObjectModel {
  static async getByAll(page, limit, departmentId, geolocation, q) {
    try {
      console.log('Entering getByAll');

      const objects = await axios
        .get(
          `${URL}search?hasImages=true&departmentId=${departmentId}&geoLocation=${geolocation}&q=${q}`
        )
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByDepartmentAndLocation(
    page,
    limit,
    departmentId,
    geolocation
  ) {
    try {
      console.log('Entering getByDepartmentAndLocation');

      const objects = await axios
        .get(
          `${URL}search?hasImages=true&departmentId=${departmentId}&geoLocation=${geolocation}&q=*`
        )
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByDepartmentAndKeyword(page, limit, departmentId, q) {
    try {
      console.log('Entering getByDepartmentAndKeyword');

      const objects = await axios
        .get(`${URL}search?hasImages=true&departmentId=${departmentId}&q=${q}`)
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByLocationAndKeyword(page, limit, geolocation, q) {
    try {
      console.log('Entering getByLocationAndKeyword');

      const objects = await axios
        .get(`${URL}search?hasImages=true&geoLocation=${geolocation}&q=${q}`)
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByDepartment(page, limit, departmentId) {
    try {
      const objects = await axios
        .get(`${URL}search?hasImages=true&departmentId=${departmentId}&q=*`)
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

  static async getByLocation(page, limit, geolocation) {
    try {
      console.log('Entering getByLocation');

      const objects = await axios
        .get(`${URL}search?hasImages=true&geoLocation=${geolocation}&q=*`)
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }

  static async getByKeyword(page, limit, keyword) {
    try {
      console.log('Entering getByKeyword');

      const objects = await axios
        .get(`${URL}search?hasImages=true&q=${keyword}`)
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
        console.error('No objects found in this location.');
        return { total: 0, page: 0, limit: 0, totalPages: 0, objects: [] };
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
}
