import express from 'express';
import bodyParser from 'body-parser';
import { db } from './models/db';

import coaches from './routes/coaches';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use('/coaches', coaches);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
}).on('error', (err: Error) => {
  console.log(err);
});

console.log(db);
