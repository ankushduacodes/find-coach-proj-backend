import { check } from 'express-validator';
import Coach, { ICoach } from '../models/schemas/coach.schema';

async function validateCoachId(val: number) {
  // TODO check for all the coach ids and see if sent coach id exists
  let coachList: ICoach[];
  try {
    coachList = await Coach.find({});
  } catch (err) {
    throw new Error('Something went wrong while validating coach id');
  }
  if (!coachList.find((coach) => coach.id === Number(val))) {
    throw new Error('Coach id is not valid');
  }
  return true;
}

export const coachIdValidator = check('coachId').trim().notEmpty().escape()
  .isInt()
  .custom(validateCoachId);

export const messageValidator = check('message').trim().notEmpty().escape();
