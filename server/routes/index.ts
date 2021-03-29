import express from 'express';
import userRouter from './api-v1/userRouter';
import organizationRouter from './api-v1/organizationRouter';
import tournamentRouter from './api-v1/tournamentRouter';

const indexRouter = express.Router();

indexRouter.use('/v1/users/', userRouter);
indexRouter.use('/v1/organization/', organizationRouter);
indexRouter.use('/v1/tournament/', tournamentRouter);

export default indexRouter;
