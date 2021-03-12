import express from 'express';
import tournamentRouter from './api-v1/tournamentRoutes';
import userRouter from './api-v1/userRoutes';

const indexRouter = express.Router();

indexRouter.use('/v1/tournaments/', tournamentRouter);
indexRouter.use('v1/users/', userRouter);

export default indexRouter;
