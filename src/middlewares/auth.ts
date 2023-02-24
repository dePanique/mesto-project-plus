import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { PASS_KEY } from '../utils/constants';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

const handleAuthError = () => {
  throw new UnauthorizedError();
};

const extractBearerToken = (header: string) => (header.replace('Bearer ', ''));

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, PASS_KEY);
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  return next();
};
