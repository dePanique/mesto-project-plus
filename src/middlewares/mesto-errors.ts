import {
  NextFunction,
  Request, Response,
} from 'express';
import { IMestoErros } from '../errors/mesto-errors';

export default (err: IMestoErros, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message });

  next();
};
