import { NextFunction, Response } from 'express';
import MestoErrors from '../errors/mesto-errors';
import { errorMessages } from '../utils/constants';
import { IRequest } from '../types/express';
import Card from '../models/card';
import { pullUserId } from '../utils/utils';

export const getCard = (_: IRequest, res: Response, next: NextFunction) => (
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next)
);

export const postCard = (req: IRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const _id = pullUserId(req);

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteCard = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);
  const { cardId } = req.params;

  Card.find({ _id: cardId })
    .then(async ([card]) => {
      if (!card) {
        throw new MestoErrors(errorMessages.dataNotFound, 404);
      }

      if (!(card.owner.toString() === _id)) {
        throw new MestoErrors(errorMessages.accessDenied, 403);
      }

      Card
        .findByIdAndDelete({ _id: cardId })
        .catch(next);

      return res
        .send({ message: 'success' });
    })
    .catch(next);
};

export const putLikeOnCard = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(() => {
      throw new MestoErrors(errorMessages.dataNotFound, 404);
    })
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteLikeOnCard = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(() => {
      throw new MestoErrors(errorMessages.dataNotFound, 404);
    })
    .then((card) => res.send(card))
    .catch(next);
};
