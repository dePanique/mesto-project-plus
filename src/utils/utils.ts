import { Response } from 'express';
import { IRequest } from '../types/express';

// TODO использовать соответствующий объект ошибки
export const pageNotFound = (_: IRequest, res: Response) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
};

export const pullUserId = (req: IRequest): String => {
  const _id = req.user?._id || '';

  return _id;
};
