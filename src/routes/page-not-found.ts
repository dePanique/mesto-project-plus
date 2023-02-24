import { Router } from 'express';
import { pageNotFound } from '../utils/utils';

const router = Router();

router.all('*', pageNotFound);

export default router;
