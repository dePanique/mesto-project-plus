import {
  Schema, model,
} from 'mongoose';
import validator from 'validator';
import { errorMessages } from '../utils/constants';

export interface IUser {
  name: string
  about: string
  avatar: string
  email: string
  password: string
}

const user = new Schema<IUser>({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
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
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.set('toJSON', {
  transform(doc, ret) {
    // eslint-disable-next-line
    delete ret.password;
    return ret;
  },
});

export default model('User', user);
