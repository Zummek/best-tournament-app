import axiosInstance from './../axiosInstance';
import * as types from './types';

export const loginWithMS = async () => {
  const response = await axiosInstance.post<types.AuthLoginResponse>(
    'v1/users/login'
  );
  return response.data;
};

export const getCookieToken = async (code: string) => {
  await axiosInstance.post('v1/users/logged', { code });
};
