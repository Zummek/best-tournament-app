import axios, { AxiosResponse } from 'axios';
import { get, isNil } from 'lodash';
import { Notify } from 'quasar';
import internalApi from './internalApi';

const api = {
  internalApi,
};

export default api;
export const axiosInstance = axios.create({
  headers: {},
  baseURL: process.env.BACKEND_API_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => handleResponseErrors(error)
);

const handleResponseErrors = (response: AxiosResponse) => {
  const status = get(response, 'response.status', 'no_status') as
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
  return Promise.reject(response);
};
