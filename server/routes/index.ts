import express from 'express';
import userRouter from './api-v1/userRoutes';
import organizationRouter from './api-v1/organizationRoutes';

const indexRouter = express.Router();

indexRouter.use('/v1/users/', userRouter);
indexRouter.use('/v1/organization/', organizationRouter);

export default indexRouter;
