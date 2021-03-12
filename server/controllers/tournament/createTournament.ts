import catchAsync from '../../utils/catchAsync';

const createTournament = catchAsync(
  (req, res, next) => {
    // waiting for database models
    res.status(204).end();
  },
);

export default createTournament;
