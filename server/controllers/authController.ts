import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';

const login = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {}
);

export default {
  login,
};
