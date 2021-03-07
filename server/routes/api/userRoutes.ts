import express from 'express';
import * as authController from './../../controllers/authController';

const userRouter = express.Router();

userRouter.post('/login', authController.login);

export default userRouter;
