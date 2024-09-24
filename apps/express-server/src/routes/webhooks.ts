import { Router, Request, Response } from 'express';

export const router: any = Router();

// Exemples de routes webhook
router.post('/example', (req: Request, res: Response) => {
  res.send('Webhook example received!');
});

export default router;
