import dotenv from 'dotenv';
import path from 'path';

const envs = dotenv.config({ path: path.resolve('.env.local') });
const BASE_URL = '';

export default {
  envs,
  BASE_URL,
};
