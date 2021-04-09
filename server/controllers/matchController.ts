import Match from '../concepts/Match';
import catchAsync from '../utils/catchAsync';

const updateScores = catchAsync(
  async (req, res) => {
    const currentUserId = req.decoded.userMSId;
    const { matchId } = req.params;

    await Match.updateMatchScores(req.body, matchId, currentUserId);

    res.status(204).end();
  },
);

export default {
  updateScores,
};
