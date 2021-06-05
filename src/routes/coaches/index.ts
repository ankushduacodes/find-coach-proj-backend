import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars,import/no-duplicates
import { Coach } from '../../models/db';
// eslint-disable-next-line
import { db } from '../../models/db';

const express = require('express');

console.log(Object.keys(db));

const router = express.Router();

router.get('/favicon.ico', (req: Request, res: Response) => res.sendStatus(204));

router.get('/', (req: Request, res: Response) => {
  res.end('coaches');
});

export default router;
