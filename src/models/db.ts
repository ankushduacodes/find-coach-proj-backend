import mongoose from 'mongoose';
import configs from '../config';

const username = configs.envs.parsed?.USERNAME || process.env.USERNAME;
const password = configs.envs.parsed?.PASSWORD || process.env.PASSWORD;

const mongoUri = `mongodb+srv://${username}:${password}@cluster0.j8wbv.mongodb.net/findACoach?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => console.log('Connection success'));

// eslint-disable-next-line import/prefer-default-export
export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => console.log('Connection Successful'));
