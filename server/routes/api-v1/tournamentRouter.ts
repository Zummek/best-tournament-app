import express from 'express';
import tournamentController from '../../controllers/tournamentController';

const tournamentRouter = express.Router();

tournamentRouter.post('/', tournamentController.create);
tournamentRouter.get('/', tournamentController.getAll);
tournamentRouter.get('/:id', tournamentController.get);
tournamentRouter.delete('/:id', tournamentController.deleteTournament);
tournamentRouter.post('/:tournamentId/matches/:matchId', tournamentController.updateMatchScores);
tournamentRouter.get('/:id/scores', tournamentController.getPointsPerTeam);

export default tournamentRouter;
