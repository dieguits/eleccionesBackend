import { Router } from 'express';
import { createVote, canVote } from '../controllers/voto.controller';

const router = Router();

router.route('/').post(createVote);

router.route('/:email').get(canVote);

export default router;