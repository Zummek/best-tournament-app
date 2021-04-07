import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getAzureADApplicationLogo = async () => {
  const logoResponse = await axiosInstance.get<types.GetLogoResponse>(
    'v1/organization/logo'
  );
  return logoResponse.data.data.logo;
};

export const getUsers = async () => {
  const usersResponse = await axiosInstance.get<types.GetUsersResponse>(
    'v1/organization/users'
  );
  return usersResponse.data.data.users;
};

export const getUserPhoto = async (id: string) => {
  const userPhotoResponse = await axiosInstance.get<types.GetUserPhotoResponse>(
    `v1/organization/users/${encodeURIComponent(id)}/photo`
  );
  return userPhotoResponse.data.data.photo;
};
