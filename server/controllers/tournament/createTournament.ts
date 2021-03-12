import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createTournament = catchAsync(
  (req: Request, res: Response) => {
    // waiting for database models
    res.status(204).end();
  },
);

export default createTournament;
