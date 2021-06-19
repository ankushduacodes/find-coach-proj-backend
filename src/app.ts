import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/db';

import coaches from './routes/coaches';
import requests from './routes/requests';

const app = express();
const port = process.env.PORT || 8080;
const basePath = '/api/v1';

app.use(bodyParser.urlencoded({
  extended: true,
}));

const allowedOrigins = [
  'http://localhost:8081',
];

const corsOptions = {
  // @ts-ignore
  origin: (origin: string, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 204,
};

// @ts-ignore
app.options('*', cors(corsOptions));
// @ts-ignore
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.get('/favicon.ico', (req: Request, res: Response) => res.sendStatus(204));
app.use(`${basePath}/coaches`, coaches);
app.use(`${basePath}/requests`, requests);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
}).on('error', (err: Error) => {
  console.log(err);
});

console.log(Object.entries(db)[-1]);
