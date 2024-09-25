import { Router } from 'express';

import { stripeInitController } from '../controllers/stripeInitController';

export const router = Router();

router.post('/stripe_customer_init', stripeInitController.initCustomerId);

router.post('/stripe_account_init', stripeInitController.initAccount);

export default router;
