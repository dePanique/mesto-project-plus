import { Router } from 'express';
import {
  deleteCard, deleteLikeOnCard, getCard, postCard, putLikeOnCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCard);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLikeOnCard);
router.delete('/:cardId/likes', deleteLikeOnCard);

export default router;
