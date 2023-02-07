import { Response } from 'express';

export const handleError = (res: Response) => {
  res.status(400).send({ message: 'invalid data' });
  res.status(404).send({ message: 'user/card hasnt found' });
  res.status(500).send({ message: 'default error' });
};

export default handleError;
