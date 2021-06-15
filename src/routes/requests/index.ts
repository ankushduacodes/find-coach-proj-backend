import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { nameValidator } from '../../validations/coachValidator';
import CoachRequest from '../../models/schemas/request.schema';
import Coach from '../../models/schemas/coach.schema';
import { coachIdValidator, messageValidator } from '../../validations/requestValidator';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let requestList;
  try {
    requestList = await CoachRequest.find({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong on the server' });
  }
  return res.status(200).json({ message: 'success', requestList });
});

router.get('/:requestId', async (req: Request, res: Response) => {
  const { requestId } = req.params;
  let request: object | null;
  try {
    request = await CoachRequest.findOne({ id: Number(requestId) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong on the server' });
  }
  if (!request) {
    return res.status(404).json({ message: 'No request was found' });
  }
  return res.status(200).json({ message: 'success', request });
});

router.post('/add',
  nameValidator,
  coachIdValidator,
  messageValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errResponse: { [x: string]: { value: any; message: any; }; }[] = [];
      Object.entries(errors.mapped()).forEach((err) => {
        errResponse.push({ [err[0]]: { value: err[1].value, message: err[1].msg } });
      });
      return res.status(500).json({ message: 'Something went wrong', error: errResponse });
    }

    const { name, coachId, message } = req.body;
    const requestId = Math.floor(Math.random() * 1000000000) + 100000;
    const newRequest = {
      name,
      coachId,
      message,
      id: requestId,
    };

    let request;
    try {
      request = await new CoachRequest(newRequest).save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong', err });
    }

    let coach;
    try {
      coach = await Coach.findOne({ id: coachId });
      if (!coach) {
        return res.status(500).json({ message: 'Something went wrong while informing the coach, Please try again' });
      }
      // @ts-ignore
      coach.requestList.push(request.id);
      await coach.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong while informing the coach, Please try again' });
    }

    // Should I be checking if the coach is found here or not
    // because I am checking it in the validator
    return res.json({ message: 'success', request });
  });

export default router;
