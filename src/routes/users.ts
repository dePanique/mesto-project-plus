import { Router } from 'express';
import {
  getUserByIdValidator, getUserInfoValidator, updateUserAvatarValidator, updateUserInfoValidator,
} from '../middlewares/requestValidator';
import {
  getUserById, getUserInfo, getUsers, patchUserProfile, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfoValidator, getUserInfo);
router.patch('/me', updateUserInfoValidator, patchUserProfile);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);
router.get('/:userId', getUserByIdValidator, getUserById);

export default router;
