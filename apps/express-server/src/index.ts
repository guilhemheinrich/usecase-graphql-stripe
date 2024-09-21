import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { Config } from 'configuration';

dotenv.config();

const app: Express = express();
const port = Config.EXPRESS_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
