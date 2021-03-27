import express from "express";
import tournamentController from "../../controllers/tournamentController";

const tournamentRouter = express.Router();

tournamentRouter.post("/", tournamentController.create);

export default tournamentRouter;
