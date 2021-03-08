import express from 'express';
import createTournament from '../../controllers/tournament/createTournament';

const router = express.Router();

router.post('', (req, res, next) => {
  const { name, owner, participants, matches } = req.body;

  createTournament({ name, owner, participants, matches });

  res.status(204).end();
})

export default router;