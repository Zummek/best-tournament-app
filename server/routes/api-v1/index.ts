import express from 'express';
import tournamentRoutes from './tournamentRoutes';

const router = express.Router();

router.use('/tournament', tournamentRoutes);

export default router;