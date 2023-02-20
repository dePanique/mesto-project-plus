import { NextFunction, Response } from 'express';
import MestoErrors from '../errors/mesto-errors';
import { errorMessages } from '../utils/constants';
import { IRequest } from '../types/express';
import Card from '../models/card';
import User from '../models/user';
import { pullUserId } from '../utils/utils';

export const getCard = (_: IRequest, res: Response, next: NextFunction) => (
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next)
);

export const postCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const _id = pullUserId(req, res);

  if (!_id) {
    next(new MestoErrors(errorMessages.errorOccured, 500));
  }

  await User.find({ _id }).then((user) => {
    const [owner] = user;

    return Card.create({ name, link, owner })
      .then((card) => res.send(card))
      .catch(next);
  })
    .catch(next);
};

export const deleteCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req, res);
  const { cardId } = req.params;

  if (!_id) {
    next(new MestoErrors(errorMessages.errorOccured, 500));
  }

  await Card.find({ _id: cardId })
    .then(async ([card]) => {
      if (!card) {
        next(new MestoErrors(errorMessages.dataNotFound, 404));
      }

      if (!(card.owner.toString() === _id)) {
        next(new MestoErrors(errorMessages.accessDenied, 403));
      }

      await Card
        .findByIdAndDelete({ _id: cardId })
        .catch(next);

      return res
        .send({ message: 'success' });
    })
    .catch(next);
};

export const putLikeOnCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req, res);
  const { cardId } = req.params;

  await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteLikeOnCard = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req, res);
  const { cardId } = req.params;

  await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};
