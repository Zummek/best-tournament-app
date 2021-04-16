import Tournament from 'app/../shared/types/Tournament';
import axiosInstance from '../axiosInstance';
import * as types from './types';

export const createTournament = async (
  payload: types.CreateTournamentPayload
) => {
  await axiosInstance.post('v1/tournaments', payload);
};

export const getTournament = async (tournamentId: string) => {
  const response = await axiosInstance.get<types.getTournamentResponse>(
    `v1/tournaments/${encodeURIComponent(tournamentId)}`
  );

  return response.data.data.tournament;
};

export const updateTournamentMatch = async (
  tournamentId: string,
  matchId: string,
  payload: types.UpdateTournamentMatchPayload
) => {
  await axiosInstance.post(
    `v1/tournaments/${encodeURIComponent(
      tournamentId
    )}/matches/${encodeURIComponent(matchId)}`,
    payload
  );
};

export const getAllTournaments = async (page: number, pageSize: number) => {
  const response = await axiosInstance.get<types.getTournamentsResponse>(
    'v1/tournaments',
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  return response.data.data;
};
