import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';

export const login = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {}
);
