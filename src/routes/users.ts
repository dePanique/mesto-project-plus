import { Router } from 'express';
import {
  getUserById, getUserInfo, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/:userId', getUserById);

export default router;
