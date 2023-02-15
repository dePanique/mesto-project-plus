import {
  Schema, model,
} from 'mongoose';
import validator from 'validator';
import { errorMessages } from '../utils/constants';

interface ICard {
  name: string
  about: string
  avatar: string
}

const user = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: errorMessages.invalidURL,
    },
  },
});

export default model('User', user);
