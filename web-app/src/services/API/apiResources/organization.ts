import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getAzureADApplicationLogo = async () => {
  const logoResponse = await axiosInstance.get<types.LogoResponse>(
    'v1/organization/logo'
  );
  return logoResponse.data.data.logo;
};

export const getUsers = async () => {
  const usersResponse = await axiosInstance.get<types.OrgUsersResponse>(
    'v1/organization/users',
    {
      withCredentials: true,
    }
  );
  return usersResponse.data.data.users;
};
export const getUserPhoto = async (id: string) => {
  const userPhotoResponse = await axiosInstance.get<types.OgUserPhotoResponse>(
    `v1/organization/users/${id}/photo`,
    {
      withCredentials: true,
    }
  );
  return userPhotoResponse.data.data.photo;
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
