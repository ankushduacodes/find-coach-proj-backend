import { Schema, model } from 'mongoose';

declare interface IRequest {
  name: string,
  id: number,
  message: string,
  coachId: number,
}

const requestSchema = new Schema({
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
  message: {
    type: String,
    required: true,
    trim: true,
  },
  coachId: {
    type: Number,
    required: true,
  },
});

export default model<IRequest>('CoachRequest', requestSchema);
