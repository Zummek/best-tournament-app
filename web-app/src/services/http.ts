import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, isNil } from 'lodash';
import { Notify } from 'quasar';
import internalApi from './internalApi';

const api = {
  internalApi,
};

export default api;
export const jc = axios.create({
  headers: {},
  baseURL: process.env.BACKEND_API_URL,
});

jc.interceptors.request.use(request => addToken(request));

const addToken = (config: AxiosRequestConfig) => {
  // TODO: get cookie 2x
  if (
    'TokenManager.getAccessToken() - get from cookie' &&
    config.url !== 'refresh'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.headers['Authorization'] =
      'Bearer ' + 'TokenManager.getAccessToken()';
  }
  return config;
};

jc.interceptors.response.use(
  response => response,
  async error => {
    // TODO: auth refresh token - needed in msal?
    return handleResponseErrors(error);
  }
);

const handleResponseErrors = (request: AxiosResponse) => {
  const status = get(request, 'response.status', 'no_status') as
    | string
    | number;

  // TODO: check cookie
  const currentlyLoggedIn = !isNil(
    'TokenManager.getAccessToken() - check cookie here'
  );

  // We want to catch only "ugly" errors here. Resource errors (validation errors etc) should
  // be caught directly in the view.
  switch (status) {
    case 500:
    case 'no_status':
      Notify.create({
        color: 'negative',
        message:
          'We have trouble connecting to server. Please try again or contact the administrator.',
        icon: 'report_problem',
      });
      break;
    case 401:
      if (currentlyLoggedIn) {
        // TODO: remove here cookie
        Notify.create({
          color: 'positive',
          message: 'You were automatically logged out.',
        });
        break;
      }
    default:
      break;
  }
  return Promise.reject(request);
};
