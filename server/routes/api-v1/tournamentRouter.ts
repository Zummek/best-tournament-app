import express from 'express';
import tournamentController from '../../controllers/tournamentController';

const tournamentRouter = express.Router();

tournamentRouter.post('/', tournamentController.create);
tournamentRouter.get('/', tournamentController.getAll);
tournamentRouter.get('/:id', tournamentController.get);

export default tournamentRouter;
