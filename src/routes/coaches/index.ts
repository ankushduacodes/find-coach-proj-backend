import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import Coach from '../../models/schemas/coach.schema';

const express = require('express');

const router = express.Router();

router.get('/allCoaches', async (req: Request, res: Response) => {
  let coachList;
  try {
    coachList = await Coach.find({});
    return res.json(coachList).status(204);
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, Please try again', error: err });
  }
});

router.get('/coach/:coachId', async (req: Request, res: Response) => {
  const { coachId } = req.params;
  let coach;
  try {
    coach = await Coach.find({ id: Number(coachId) });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, Please try again', error: err });
  }
  if (!Object.keys(coach).length) {
    return res.status(404).json({ message: 'no coach was found' });
  }
  return res.send(200).json({ message: 'Coach Found', coach });
});

export default router;
