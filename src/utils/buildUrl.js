export const buildUrl = (baseUrl, params) => {
  const url = new URL(baseUrl);
  url.searchParams.append('hasImages', 'true');

  if (params.departmentId) {
    url.searchParams.append('departmentId', params.departmentId);
  }

  if (params.geolocation) {
    url.searchParams.append('geoLocation', params.geolocation);
  }

  if (params.q) {
    url.searchParams.append('q', params.q);
  } else {
    url.searchParams.append('q', '*');
  }

  return url.toString();
};
