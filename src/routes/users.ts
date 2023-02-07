import { Router } from 'express';
import { checkUserEmail } from '../utils/utils';
import {
  createUser, getUserById, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', checkUserEmail, getUserById);
router.patch('/me', patchUserProfile);
router.patch('/me/avatar', updateUserAvatar);

export default router;
