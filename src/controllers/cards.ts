import { NextFunction, Response } from 'express';
import { IRequest } from '../types/express';
import Card from '../models/card';
import { pullUserId } from '../utils/utils';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

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
        throw new NotFoundError();
      }

      if (!(card.owner.toString() === _id)) {
        throw new ForbiddenError();
      }

      Card
        .findByIdAndDelete({ _id: cardId })
        .then(() => {
          res
            .send({ message: 'success' });
        })
        .catch(next);
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
      throw new NotFoundError();
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
      throw new NotFoundError();
    })
    .then((card) => res.send(card))
    .catch(next);
};
