import express from 'express';
import tournamentController from '../../controllers/tournamentController';

const tournamentRouter = express.Router();

tournamentRouter.post('/', tournamentController.create);
tournamentRouter.post('/:tournamentId/match/:matchId', tournamentController.updateMatchOutcomes);
tournamentRouter.get('/', tournamentController.getAllTournaments);
tournamentRouter.get('/:id', tournamentController.getTournament);

export default tournamentRouter;
