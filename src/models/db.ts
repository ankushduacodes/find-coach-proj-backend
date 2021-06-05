import mongoose from 'mongoose';

import coachSchema from './schemas/coach.schema';
import requestSchema from './schemas/request.schema';
import configs from '../config';

const username = configs.envs.parsed?.USERNAME || process.env.USERNAME;
const password = configs.envs.parsed?.PASSWORD || process.env.PASSWORD;

const mongoUri = `mongodb+srv://${username}:${password}@cluster0.j8wbv.mongodb.net/findACoach?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => console.log('Connection success'));

export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => console.log('Connection Successful'));

export const Coach = mongoose.model('Coach', coachSchema);
export const Request = mongoose.model('Request', requestSchema);
