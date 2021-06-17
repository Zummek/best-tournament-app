import Tournament from '../concepts/Tournament';
import catchAsync from '../utils/catchAsync';

const createTournament = catchAsync(
  async (req, res) => {
    const currentUserId = req.decoded.userMSId;

    const tournament = await Tournament.create(req.body, currentUserId, `Bearer ${req.cookies.jwt}`);

    res.status(201).json({
      data: {
        id: tournament.id,
      },
    });
  },
);

const getAllTournaments = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 100;

  const enrichedData = await Tournament.getAll(page, pageSize, `Bearer ${req.cookies.jwt}`);
  res.status(200).json({
    data: enrichedData,
  });
});

const getTournament = catchAsync(async (req, res) => {
  const tournament = await Tournament.getById(req.params.id, `Bearer ${req.cookies.jwt}`);

  if (!tournament) {
    res.status(404).end();
    return;
  }

  res.status(200).json({
    data: { tournament },
  });
});
const getPointsPerTeam = catchAsync(async (req, res) => {
  const pointsPerTeam = await Tournament.countPointsPerTeam(req.params.id);
  if (!pointsPerTeam) {
    res.status(404).end();
    return;
  }
  res.status(200).json({
    data: { pointsPerTeam },
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
  const currentUserId = req.decoded.userMSId;
  await Tournament.delete(req.params.id, currentUserId);
  res.status(204).end();
});

export default {
  create: createTournament,
  getAll: getAllTournaments,
  get: getTournament,
  deleteTournament,
  updateMatchScores,
  getPointsPerTeam,
};
