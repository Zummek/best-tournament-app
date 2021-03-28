import Tournament from '../concepts/Tournament';
import catchAsync from '../utils/catchAsync';

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

export default {
  create: createTournament,
};
