import express from 'express';
import * as authController from '../../controllers/authController';

const userRouter = express.Router();

userRouter.get('/login', authController.login);

userRouter.get('/logged', authController.getToken);

export default userRouter;
