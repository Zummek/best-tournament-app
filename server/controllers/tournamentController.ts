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

const getAllTournaments = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 100;

  const data = await TournamentRepository.getAll(page, pageSize);
  const enrichedTournament = await Tournament.enrichTournamentsWithMSUsers(data.tournaments, `Bearer ${req.cookies.jwt}`);

  res.status(200).json({
    data: {
      totalRows: data.totalRows,
      tournaments: enrichedTournament,
    },
  });
});

const getTournament = catchAsync(async (req, res) => {
  const tournament = await TournamentRepository.getById(req.params.id);

  if (!tournament) {
    res.status(404).end();
    return;
  }

  const enrichedTournament = await Tournament.enrichWithMSUsers(tournament, `Bearer ${req.cookies.jwt}`);

  res.status(200).json({
    data: { tournament: enrichedTournament },
  });
});

const updateMatchScores = catchAsync(
  async (req, res) => {
    const currentUserId = req.decoded.userMSId;
    const { tournamentId, matchId } = req.params;

    await Tournament.updateMatchScores(req.body, tournamentId, matchId, currentUserId);

    res.status(204).end();
  },
);
const deleteTournament = catchAsync(async (req, res) => {
  await TournamentRepository.delete(req.params.id);
  res.status(204).end();
});

export default {
  create: createTournament,
  getAll: getAllTournaments,
  get: getTournament,
  deleteTournament,
  updateMatchScores,
};
