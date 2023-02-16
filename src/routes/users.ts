import { Router } from 'express';
import { checkUserEmail } from '../utils/utils';
import {
  getUserById, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, getUsers);
router.get('/:userId', checkUserEmail, getUserById);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;
