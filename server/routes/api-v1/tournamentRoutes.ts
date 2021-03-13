import express from "express";
import tournamentController from "../../controllers/tournament";

const tournamentRouter = express.Router();

tournamentRouter.post("/", tournamentController.create);

export default tournamentRouter;
