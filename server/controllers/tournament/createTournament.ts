import catchAsync from '../../utils/catchAsync';
import writeResponse from '../../utils/writeResponse';

const createTournament = catchAsync(
  (req, res) => {
    writeResponse(res, {
      httpStatus: 204,
    });
  },
);

export default createTournament;
