import { Router } from 'express';
import {
  deleteCardByIdValidator, deleteLikeOnCardValidator, postCardValidator, putLikeOnCardValidator,
} from '../middlewares/request-validator';
import {
  deleteCard, deleteLikeOnCard, getCard, postCard, putLikeOnCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCard);
router.post('/', postCardValidator, postCard);
router.delete('/:cardId', deleteCardByIdValidator, deleteCard);
router.put('/:cardId/likes', putLikeOnCardValidator, putLikeOnCard);
router.delete('/:cardId/likes', deleteLikeOnCardValidator, deleteLikeOnCard);

export default router;
