import { Schema, model } from 'mongoose';

interface IContactInfo {
  phone: string,
  email: string
}

interface ICoach {
  name: string,
  id: number,
  age: number,
  expertise: Array<string>,
  contactInfo: IContactInfo,
}

const possibleExpertise = ['backend', 'frontend', 'database'];
const possibleContactInfoKeys = ['phone', 'email'];

function checker(arr: boolean[]) {
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
        validator: function lengthCheck(val: Array<string>) {
          return val.length <= 3 && val.length > 0;
        },
        message: (props) => `${props.value} is not valid`,
      },
      {
        validator: function valueCheck(valArr: Array<string>) {
          const boolArr = valArr.map((val) => possibleExpertise.includes(val.toLowerCase()));
          return checker(boolArr);
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
        validator: function lengthCheck(valObj: IContactInfo) {
          return Object.keys(valObj).length === 2;
        },
        message: (props) => `${props.value} needs to have both phone and email`,
      },
      {
        validator: function objectKeyCheck(valObj: IContactInfo) {
          const boolArr = Object.keys(valObj).map(
            (val) => possibleContactInfoKeys.includes(val.toLowerCase()),
          );
          return checker(boolArr);
        },
        message: (props) => `${props.value} is not valid`,
      },
    ],
  },
});

export default model<ICoach>('coach', coachSchema);
