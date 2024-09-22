import { Router, Request, Response } from 'express';

export const router = Router();

// Exemples de routes trigger
router.post('/stripe_customer_init', (req: Request, res: Response) => {
  console.log('received body', req.body);
  // Retieve row
  // Stripe init
  res.send(`Initialization: ${JSON.stringify(req.body)}`);
});

router.post('/stripe_account_init', (req: Request, res: Response) => {
  console.log('received body', req.body);
  res.send(`Initialization: ${JSON.stringify(req.body)}`);
});

export default router;
