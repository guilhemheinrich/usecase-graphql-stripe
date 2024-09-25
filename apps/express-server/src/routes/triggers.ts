import { Router } from 'express';

import { stripeInitController } from '../controllers/stripeInitController';

//! Some messy mess is at work here, use any to shut compilation issue :/
export const router: any = Router();

router.post('/stripe_customer_init', stripeInitController.initCustomerId);

router.post('/stripe_account_init', stripeInitController.initAccount);

export default router;
