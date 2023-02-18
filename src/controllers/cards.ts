import { Response } from 'express';
import { IRequest } from '../types/express';
import Card from '../models/card';
import User from '../models/user';
import { handleError, pullUserId } from '../utils/utils';

export const getCard = (_: IRequest, res: Response) => (
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err, res))
);

export const postCard = async (req: IRequest, res: Response) => {
  const { name, link } = req.body;
  const _id = pullUserId(req, res);

  await User.find({ _id }).then((user) => {
    const [owner] = user;

    return Card.create({ name, link, owner })
      .then((card) => res.send(card))
      .catch((err) => handleError(err, res));
  })
    .catch((err) => handleError(err, res));
};

export const deleteCard = async (req: IRequest, res: Response) => {
  const _id = pullUserId(req, res);
  const { cardId } = req.params;
  console.log(cardId);

  await Card.find({ _id: cardId })
    .then(async ([card]) => {
      if (!card) {
        console.log('hey');
        return Promise.reject(new Error('Карточка не найдена'));
      }

      if (!(card.owner.toString() === _id)) {
        console.log('hop');
        return Promise.reject(new Error('В доступе отказано'));
      }
      console.log('done');
      await Card.findByIdAndDelete({ _id: cardId });
      return res.send({ message: 'success' });
    })
    .catch((err) => handleError(err, res));
};

export const putLikeOnCard = async (req: IRequest, res: Response) => {
  const _id = pullUserId(req, res);

  await Card.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

export const deleteLikeOnCard = async (req: IRequest, res: Response) => {
  const _id = pullUserId(req, res);

  await Card.findByIdAndUpdate(
    _id,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
