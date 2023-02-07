import {
  Schema, model, Types,
} from 'mongoose';

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
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
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
