import express from 'express';
import tournamentController from '../../controllers/tournamentController';

const tournamentRouter = express.Router();

tournamentRouter.post('/', tournamentController.create);
<<<<<<< HEAD
tournamentRouter.get('/', tournamentController.getAll);
tournamentRouter.get('/:id', tournamentController.get);
tournamentRouter.post('/:tournamentId/matches/:matchId', tournamentController.updateMatchScores);

=======
tournamentRouter.post('/:tournamentId/match/:matchId', tournamentController.updateMatchOutcomes);
tournamentRouter.get('/', tournamentController.getAllTournaments);
tournamentRouter.get('/:id', tournamentController.getTournament);
tournamentRouter.delete('/:id', tournamentController.deleteTournament);
>>>>>>> Delete tournament
export default tournamentRouter;
