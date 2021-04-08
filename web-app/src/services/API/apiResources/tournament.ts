import Tournament from 'app/../shared/types/Tournament';
import axiosInstance from '../axiosInstance';
import * as types from './types';

export const createTournament = async (
  payload: types.CreateTournamentPayload
) => {
  try {
    const response = await axiosInstance.post<types.CreateTournamentResponse>(
      'v1/tournaments',
      payload
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(error.response);
  }
};

export const getTournament = async (tournamentId: string) => {
  const response = await axiosInstance.get<types.GetTournamentResponse>(
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
