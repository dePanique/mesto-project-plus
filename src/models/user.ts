import {
  Schema, model,
} from 'mongoose';
import validator from 'validator';
import { errorMessages } from '../utils/constants';

interface ICard {
  name: string
  about: string
  avatar: string
  email: string
  password: string
}

const user = new Schema<ICard>({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (URL: string) => validator.isURL(URL),
      message: errorMessages.invalidURL,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: errorMessages.invalidURL,
    },
    select: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', user);
