import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getAzureADApplicationLogo = async () => {
  const logoResponse = await axiosInstance.get<types.LogoResponse>(
    'v1/organization/logo'
  );
  return logoResponse.data.data;
};

export const getUsers = async () => {
  const usersResponse = await axiosInstance.get('v1/organization/users', {
    withCredentials: true,
  });
  return usersResponse.data.users;
};
export const getUserPhoto = async (id: string) => {
  const userPhotoResponse = await axiosInstance.get(
    `v1/organization/users/${id}/photo`,
    {
      withCredentials: true,
    }
  );
  return userPhotoResponse.data.photo;
};
