import authController from '../../controllers/authController';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/login', authController.login);

export default userRouter;
