import { Response } from 'express';
import { IRequest } from '../types/express';
import Card from '../models/card';
import User from '../models/user';
import { handleError } from '../utils/utils';

export const getCard = (_: IRequest, res: Response) => (

  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res))
);

export const postCard = async (req: IRequest, res: Response) => {
  const { name, link } = req.body;
  const _id = req.user?._id;

  await User.find({ _id }).then((user) => {
    const [owner] = user;

    return Card.create({ name, link, owner })
      .then((card) => res.send(card))
      .catch((err) => handleError(err, res));
  })
    .catch((err) => handleError(err, res));
};

export const deleteCard = async (_: IRequest, res: Response) => {
  try {
    await Card.deleteOne({ _id: '63dfb0c14fe95fa24fe6f25f' });
  } catch (err: any) {
    handleError(err, res);
  }
};

export const putLikeOnCard = async (req: IRequest, res: Response) => {
  const _id = req.user?._id;

  await Card.findByIdAndUpdate(
    '63dfb0c14fe95fa24fe6f25f',
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

export const deleteLikeOnCard = async (req: IRequest, res: Response) => {
  const _id = req.user?._id;

  await Card.findByIdAndUpdate(
    '63dfb0c14fe95fa24fe6f25f',
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
