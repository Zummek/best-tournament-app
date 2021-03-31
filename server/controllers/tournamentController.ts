import Tournament from '../concepts/Tournament';
import catchAsync from '../utils/catchAsync';
import TournamentRepository from '../database/repositories/TournamentRepository';

const createTournament = catchAsync(
  async (req, res) => {
    const currentUserId = '58e1ca1c-8fc1-11eb-8dcd-0242ac130003'; // TODO: waiting for decoded middleware => `req.decoded.user.id`

    const tournament = await Tournament.create(req.body, currentUserId);

    res.status(201).json({
      data: {
        id: tournament.id,
      },
    });
  },
);

const updateMatchOutcomes = catchAsync(
  async (req, res) => {
    const currentUserId = '3'; // TODO: waiting for decoded middleware => `req.decoded.user.id`
    const { matchId } = req.params;

    await Tournament.updateMatchOutcomes(req.body, matchId, currentUserId);

    res.status(204).end();
  },
);

const getAllTournaments = catchAsync(async (req, res) => {
  const tournaments = await TournamentRepository.getAll();
  res.status(200).json({
    tournaments,
  });
});

const getTournament = catchAsync(async (req, res) => {
  const tournament = await TournamentRepository.getById(req.params.id);
  res.status(200).json({
    tournament,
  });
});

export default {
  create: createTournament,
  updateMatchOutcomes,
  getAllTournaments,
  getTournament,
};
