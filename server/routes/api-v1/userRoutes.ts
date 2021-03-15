import express from 'express';
import * as authController from '../../controllers/authController';

const userRouter = express.Router();

userRouter.post('/login', authController.login);

userRouter.post('/logged', authController.getToken);

userRouter.get('/logo', authController.getApplicationLogo);

export default userRouter;
