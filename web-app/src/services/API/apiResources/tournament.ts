import axiosInstance from '../axiosInstance';
import * as types from './types';

export const createTournament = async (
  payload: types.CreateTournamentPayload
) => {
  await axiosInstance.post('v1/tournament', payload);
};

export const getTournament = async (tournamentId: string) => {
  const response = await axiosInstance.get<types.getTournamentResponse>(
    `v1/tournament/${encodeURIComponent(tournamentId)}`
  );
  return response.data;
};
