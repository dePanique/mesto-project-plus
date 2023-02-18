import { Router } from 'express';
import { checkUserEmail } from '../utils/utils';
import {
  getUserById, getUserInfo, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', getUsers);
router.get('/me', auth, getUserInfo);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/:userId', checkUserEmail, getUserById);

export default router;
