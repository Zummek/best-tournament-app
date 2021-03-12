import express from 'express';
import userRouter from './api-v1/userRoutes';

const indexRouter = express.Router();

indexRouter.use('/v1/users/', userRouter);

export default indexRouter;
