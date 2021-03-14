import { jc } from 'src/services/http';
import * as types from './types';
import Tournament from '../../../../../shared/types/Tournament';

export const createTournament = async (
  payload: types.CreateTournamentPayload
) => {
  await jc.post('v1/tournament', payload);
};

export const getTournament = async (tournamentId: string) => {
  const response = await jc.get<Tournament>(
    `v1/tournament/${encodeURIComponent(tournamentId)}`
  );
  return response.data;
};
