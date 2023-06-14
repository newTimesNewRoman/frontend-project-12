const apiPath = '/api/v1';

const api = {
  data: () => [apiPath, 'data'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  registration: () => [apiPath, 'signup'].join('/'),
};

export default api;
