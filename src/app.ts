import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { db } from './models/db';

import coaches from './routes/coaches';

const app = express();
const port = process.env.PORT || 8080;
const basePath = '/api/v1';

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.get('/favicon.ico', (req: Request, res: Response) => res.sendStatus(204));
app.use(`${basePath}/coaches`, coaches);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
}).on('error', (err: Error) => {
  console.log(err);
});

console.log(db);
