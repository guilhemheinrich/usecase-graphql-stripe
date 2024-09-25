import { Router, Request, Response } from 'express';
import supabase from '../supabase';
import { Config } from 'configuration';
//! Some messy mess is at work here
export const router: any = Router();

// Exemples de routes pour actions API
router.get('/status', (req: Request, res: Response) => {
  res.send('API is up and running!');
});

router.get('/debug', async (req: Request, res: Response) => {
  try {
    console.log(Config.SUPABASE_URL);
    console.log(Config.SUPABASE_SERVICE_KEY);
    const { data: artists, error } = await supabase
      .from('beewyse_artist')
      .select();
    if (error) throw error;
    res.send(artists);
    console.log(artists);
  } catch (error) {
    console.error(error);
  }
  res.send('Action executed!');
});

export default router;
