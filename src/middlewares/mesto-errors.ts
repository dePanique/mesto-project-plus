import {
  NextFunction,
  Request, Response,
} from 'express';

interface IMestoErros extends Error {
  statusCode?: number,
}

export default (err: IMestoErros, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message = 'Ошибка сервера' } = err;

  res
    .status(statusCode)
    .send({ message });

  next();
};
