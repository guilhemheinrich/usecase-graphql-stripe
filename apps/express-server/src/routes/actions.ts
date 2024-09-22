import { Router, Request, Response } from 'express';

export const router = Router();

// Exemples de routes pour actions API
router.get('/status', (req: Request, res: Response) => {
  res.send('API is up and running!');
});

router.post('/execute', (req: Request, res: Response) => {
  res.send('Action executed!');
});

export default router;
