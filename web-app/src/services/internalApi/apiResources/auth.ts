import { jc } from '../../http';
import * as types from './types';

export const loginWithMS = async () => {
  const response = await jc.post<types.AuthLoginResponse>('v1/users/login');
  return response.data;
};

// TODO: create better name to `logged` endpoint / function name
export const getToken = async (code: string) => {
  await jc.post('v1/users/logged', { code });
};
