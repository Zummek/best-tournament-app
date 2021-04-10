import express from 'express';
import matchController from '../../controllers/matchController';

const matchRouter = express.Router();

matchRouter.post('/:matchId', matchController.updateScores);

export default matchRouter;
