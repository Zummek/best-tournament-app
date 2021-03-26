import axiosInstance from '../axiosInstance';
import * as types from './types';

export const getAzureADApplicationLogo = async () => {
  const logoResponse = await axiosInstance.get<types.LogoResponse>(
    'v1/users/logo'
  );
  return logoResponse.data.logo;
};
