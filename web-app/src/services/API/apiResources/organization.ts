import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getAzureADApplicationLogo = async () => {
  const logoResponse = await axiosInstance.get<types.LogoResponse>(
    'v1/organization/logo'
  );
  return logoResponse.data.data;
};

export const getUsers = async () => {
  const usersResponse = await axiosInstance.post(
    'http://localhost:3000/v1/organization/users',
    {},
    {
      withCredentials: true,
    }
  );
  return usersResponse.data.users;
};
