import { Router } from 'express';
import {
  createUser, getUserById, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;
