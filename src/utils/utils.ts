import NotFoundError from '../errors/NotFoundError';
import { IRequest } from '../types/express';

export const pageNotFound = () => {
  throw new NotFoundError();
};

export const pullUserId = (req: IRequest): String => {
  const _id = req.user?._id || '';

  return _id;
};
