import express from 'express';
import userRouter from './api-v1/userRouter';
import organizationRouter from './api-v1/organizationRouter';
import tournamentRouter from './api-v1/tournamentRouter';
import matchRouter from './api-v1/matchRouter';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import unless from '../utils/unlessMiddleware';

const indexRouter = express.Router();

indexRouter.use(unless(authenticationMiddleware,
  '/v1/users/login',
  '/v1/users/logged',
  '/v1/organization/logo'));

indexRouter.use('/v1/users/', userRouter);
indexRouter.use('/v1/organization/', organizationRouter);
indexRouter.use('/v1/tournaments/', tournamentRouter);
indexRouter.use('/v1/matches/', matchRouter);

export default indexRouter;
