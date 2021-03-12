import express from 'express';
import userRouter from './api-v1/userRoutes';
import organizationRouter from './api-v1/organizationRoutes';
import tournamentRoutes from './api-v1/tournamentRoutes';

const indexRouter = express.Router();

indexRouter.use('/v1/users/', userRouter);
indexRouter.use('/v1/organization/', organizationRouter);
indexRouter.use('/v1/tournament', tournamentRoutes);

export default indexRouter;
