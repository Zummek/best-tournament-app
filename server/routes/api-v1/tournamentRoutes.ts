import express from 'express';
import tournamentController from '../../controllers/tournament/';

const router = express.Router();

router.post('', tournamentController.create);

export default router;