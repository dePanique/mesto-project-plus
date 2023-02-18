import {
  Schema, model, Types,
} from 'mongoose';
import validator from 'validator';
import { errorMessages } from '../utils/constants';

interface ICard {
  name: string
  link: string
  owner: Types.ObjectId
  likes: [Types.ObjectId]
  createdAt: Date
}

const card = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (URL: string) => validator.isURL(URL),
      message: `my_error_message: ${errorMessages.invalidURL}`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Card', card);
