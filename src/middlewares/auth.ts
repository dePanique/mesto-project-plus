import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PASS_KEY } from '../utils/constants';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}
// TODO нужен соответствующий объект ошибки
const handleAuthError = (res: Response) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header: string) => (header.replace('Bearer ', ''));

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, PASS_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
