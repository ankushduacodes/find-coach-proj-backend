import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import Coach from '../../models/schemas/coach.schema';

const express = require('express');

const router = express.Router();

router.get('/favicon.ico', (req: Request, res: Response) => res.sendStatus(204));

router.get('/', async (req: Request, res: Response) => {
  const newCoach = new Coach({
    name: 'Ankush Dua',
    id: 1234,
    age: 23,
    expertise: ['backend'],
    contactInfo: {
      phone: '123456',
      email: 'a@test.com',
    },
  });
  try {
    await newCoach.save();
  } catch (err) {
    console.log(err);
  }
  res.end('Hello coach');
});

export default router;
