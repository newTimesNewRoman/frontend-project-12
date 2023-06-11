const apiPath = '/api/v1';

const routes = {
  dataApi: () => [apiPath, 'data'].join('/'),
  loginApi: () => [apiPath, 'login'].join('/'),
  registrationApi: () => [apiPath, 'signup'].join('/'),
  homePage: () => '/',
  loginPage: () => '/login',
  registrationPage: () => '/signup',
};

export default routes;
