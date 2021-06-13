import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import { validationResult } from 'express-validator';
import Coach from '../../models/schemas/coach.schema';
import {
  nameValidator,
  emailValidator,
  ageValidator,
  phoneNumberValidator,
  expertiseValidator,
} from '../../validations/coachValidator';

const express = require('express');

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let coachList;
  try {
    coachList = await Coach.find({});
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, Please try again' });
  }
  return res.status(204).json(coachList);
});

router.get('/:coachId', async (req: Request, res: Response) => {
  const { coachId } = req.params;
  let coach: object | null;
  try {
    coach = await Coach.findOne({ id: Number(coachId) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong, Please try again' });
  }
  if (!coach) {
    return res.status(404).json({ message: 'No coach was found' });
  }
  return res.status(200).json({ message: 'Coach Found', coach });
});

router.post(
  '/add',
  nameValidator,
  emailValidator,
  ageValidator,
  phoneNumberValidator,
  expertiseValidator,
  async (req: Request, res: Response) => {
    const {
      // eslint-disable-next-line no-unused-vars
      name, age, expertise, phone, email,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      const errResponse = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const err in mappedErrors) {
        // eslint-disable-next-line no-prototype-builtins
        if (mappedErrors.hasOwnProperty(err)) {
          errResponse.push(
            { [err]: { value: mappedErrors[err].value, msg: mappedErrors[err].msg } },
          );
        }
      }
      return res.status(400).json({ message: 'Validation error occurred', error: errResponse });
    }
    const newCoach = {
      name,
      age,
      expertise,
      contactInfo: {
        phone,
        email,
      },
    };
    let coach;
    try {
      coach = await new Coach(newCoach).save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong, Please try again' });
    }
    return res.json({ message: 'success', coach });
  },
);

export default router;
