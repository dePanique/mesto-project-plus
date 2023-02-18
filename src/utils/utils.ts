import { Response, Request, NextFunction } from 'express';
import validator from 'validator';
import { errorMessages } from './constants';
import { IRequest } from '../types/express';

export const handleError = (err: any, res: Response) => {
  if (err.message.split(': ').includes(errorMessages.invalidURL)) {
    res
      .status(404)
      .send({ message: errorMessages.invalidURL });
  }

  if (err.name === 'CastError') {
    res
      .status(400)
      .send({ message: errorMessages.invalidData });
  } else if (err.name === 'ValidationError') {
    res
      .status(404)
      .send({ message: errorMessages.dataNotFound });
  } else {
    res
      .status(500)
      .send({ message: errorMessages.errorOccured });
  }
};

export const checkUserEmail = async (req: Request, response: Response, next: NextFunction) => {
  const { email } = await req.body;

  const myPromise = new Promise((resolve, reject) => {
    if (validator.isEmail(email)) {
      resolve('');
    } else {
      reject();
    }
  });

  return myPromise
    .then(() => next)
    .catch(() => {
      response.send({ message: 'invalid email' });
    });
};

export default handleError;
export const pageNotFound = (_: IRequest, res: Response) => {
  res.send({
    message: 'Запрашиваемый ресурс не найден',
  });
};

export const sayHello = (_: IRequest, res: Response) => {
  res.send('Hello');
};

export const pullUserId = (req: IRequest, res: Response) => {
  const _id = req.user?._id || res
    .status(401)
    .send({ message: 'Необходима авторизация' });

  return _id;
};
