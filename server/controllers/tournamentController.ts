import Tournament from '../concepts/Tournament';
import catchAsync from '../utils/catchAsync';
import TournamentRepository from '../database/repositories/TournamentRepository';

const createTournament = catchAsync(
  async (req, res) => {
    const currentUserId = req.decoded.userMSId;

    const tournament = await Tournament.create(req.body, currentUserId);

    res.status(201).json({
      data: {
        _id: tournament._id,
      },
    });
  },
);

const updateMatchOutcomes = catchAsync(
  async (req, res) => {
    const currentUserId = req.decoded.userMSId;
    const { matchId } = req.params;

    await Tournament.updateMatchOutcomes(req.body, matchId, currentUserId);

    res.status(204).end();
  },
);

const getAllTournaments = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 100;
  const tournaments = await TournamentRepository.getAll(page, pageSize);
  res.status(200).json({
    data: { tournaments },
  });
});

const getTournament = catchAsync(async (req, res) => {
  const tournament = await TournamentRepository.getById(req.params.id);
  res.status(200).json({
    data: { tournament },
  });
});

export default {
  create: createTournament,
  updateMatchOutcomes,
  getAllTournaments,
  getTournament,
};
