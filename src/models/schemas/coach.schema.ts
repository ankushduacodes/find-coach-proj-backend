import { Schema, model } from 'mongoose';

declare interface IContactInfo {
  phone: string,
  email: string
}

export declare interface ICoach {
  name: string,
  id: number,
  age: number,
  expertise: Array<string>,
  contactInfo: IContactInfo,
  requests?: Array<number>
}

export const possibleExpertise = ['backend', 'frontend', 'database'];
const possibleContactInfoKeys = ['phone', 'email'];

function valueValidityCheck(arr: boolean[]) {
  return arr.every(Boolean);
}

const coachSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
  },
  expertise: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function lengthValidator(val: Array<string>) {
          return val.length <= 3 && val.length > 0;
        },
        message: (props) => `${props.value} is not valid`,
      },
      {
        validator: function valueValidator(valArr: Array<string>) {
          // One of the ways to check for valid values
          const filteredArr = valArr.filter((val) => possibleExpertise.includes(val.toLowerCase()));
          return filteredArr.length === valArr.length;
        },
        message: (props) => `${props.value} is not valid`,
      },
    ],
  },
  contactInfo: {
    type: Object,
    required: true,
    validate: [
      {
        validator: function lengthValidator(valObj: IContactInfo) {
          return Object.keys(valObj).length === 2;
        },
        message: (props) => `${props.value} needs to have both phone and email`,
      },
      {
        validator: function objectKeysValidator(valObj: IContactInfo) {
          // Second way of checking for valid values
          const boolArr = Object.keys(valObj).map(
            (val) => possibleContactInfoKeys.includes(val.toLowerCase()),
          );
          return valueValidityCheck(boolArr);
        },
        message: (props) => `${props.value} is not valid`,
      },
    ],
  },
  requestList: {
    type: [Number],
    default: [],
  },
});

export default model<ICoach>('coach', coachSchema);
