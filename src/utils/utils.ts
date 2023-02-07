import { Response, Request, NextFunction } from 'express';
import validator from 'validator';

export const handleError = (res: Response) => {
  res.status(400).send({ message: 'invalid data' });
  res.status(404).send({ message: 'user/card hasnt found' });
  res.status(500).send({ message: 'default error' });
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
