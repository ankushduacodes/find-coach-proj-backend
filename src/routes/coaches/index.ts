import express, { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import {
  validationResult,
} from 'express-validator';
import Coach from '../../models/schemas/coach.schema';
import {
  nameValidator,
  emailValidator,
  ageValidator,
  phoneNumberValidator,
  expertiseValidator,
} from '../../validations/coachValidator';

const router = express.Router();

declare interface IContactInfo {
  phone: string,
  email: string,
}

declare interface ICoachObj {
  name: string,
  age: number,
  id: number,
  expertise: Array<string>,
  contactInfo: IContactInfo,
}

router.get('/', async (req: Request, res: Response) => {
  let coachList;
  try {
    coachList = await Coach.find({});
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, Please try again' });
  }
  return res.status(200).json({ message: 'success', coachList });
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
  return res.status(200).json({ message: 'success', coach });
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
    const coachId = Math.floor(Math.random() * 1000000000) + 1000;
    const newCoach: ICoachObj = {
      name,
      age,
      id: coachId,
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
