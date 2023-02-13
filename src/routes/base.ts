import { Router } from 'express';
import { pageNotFound, sayHello } from '../utils/utils';

const router = Router();

router.get('', sayHello);
router.all('*', pageNotFound);

export default router;
