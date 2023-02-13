import {
  Schema, model,
} from 'mongoose';

interface ICard {
  name: string
  about: string
  avatar: string
}

// Валидация это тема второй части задания
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
  },
});

export default model('User', user);
