import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { Config } from 'configuration';
import webhooksRouter from './routes/webhooks';
import triggerRouter from './routes/triggers';
import actionsRouter from './routes/actions';

dotenv.config();

const app: Express = express();
const port = Config.EXPRESS_PORT;
console.log(Config.EXPRESS_PORT);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.json());

app.use('/webhook', webhooksRouter);
app.use('/trigger', triggerRouter);
app.use('/', actionsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
