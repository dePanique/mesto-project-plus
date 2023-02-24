import { Router } from 'express';
import {
  getUserByIdValidator, updateUserAvatarValidator, updateUserInfoValidator,
} from '../middlewares/request-validator';
import {
  getUserById, getUserInfo, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidator, patchUserProfile);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);
router.get('/:userId', getUserByIdValidator, getUserById);

export default router;
