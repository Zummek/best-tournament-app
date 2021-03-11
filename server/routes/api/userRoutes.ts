import * as authController from "../../controllers/authController";
import express from "express";

const userRouter = express.Router();

userRouter.get("/login", authController.login);

userRouter.get("/logged", authController.getToken);

export default userRouter;
