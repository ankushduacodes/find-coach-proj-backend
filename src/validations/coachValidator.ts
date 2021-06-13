import { check, CustomValidator, ValidationChain } from 'express-validator';
import { possibleExpertise } from '../models/schemas/coach.schema';

const areValidExpertise: CustomValidator = (incomingDataArr: string[]) => {
  const filteredArr = incomingDataArr.filter((val) => possibleExpertise.includes(val));
  if (!(filteredArr.length === incomingDataArr.length)) {
    throw new Error('Expertise values are not valid');
  }
  return true;
};

export const nameValidator: ValidationChain = check('name').trim().escape().notEmpty()
  .isLength({
    min: 2,
    max: 100,
  })
  .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/);

export const ageValidator = check('age').trim().escape().notEmpty()
  .toInt();

export const emailValidator = check('email').trim().escape().notEmpty()
  .normalizeEmail()
  .isEmail();

export const phoneNumberValidator = check('phone').trim().escape().notEmpty()
  .matches(/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/);

export const expertiseValidator = check('expertise').isArray({
  min: 1,
  max: 3,
}).notEmpty()
  .custom(areValidExpertise);
