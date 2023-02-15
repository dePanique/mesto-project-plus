import { Response } from 'express';
import { IRequest } from '../types/express';
import { errorMessages } from './constants';

export const handleError = (err: any, res: Response) => {
  if (err.message.split(': ').includes(errorMessages.invalidURL)) {
    res.status(404).send({ message: errorMessages.invalidURL });
  }

  if (err.name === 'CastError') {
    res.status(400).send({ message: errorMessages.invalidData });
  } else if (err.name === 'ValidationError') {
    res.status(404).send({ message: errorMessages.dataNotFound });
  } else {
    res.status(500).send({ message: errorMessages.errorOccured });
  }
};

export const pageNotFound = (_: IRequest, res: Response) => {
  res.send({
    message: 'Запрашиваемый ресурс не найден',
  });
};

export const sayHello = (_: IRequest, res: Response) => {
  res.send('Hello');
};
