import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IRequest } from '../types/express';
import User from '../models/user';
import { pullUserId } from '../utils/utils';
import { PASS_KEY } from '../utils/constants';
import UnauthorizedError from '../errors/UnauthorizedError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';

export const getUsers = (_: Request, res: Response, next: NextFunction) => (User.find({})
  .then((users) => res.send(users))
  .catch(next)
);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash: string) => (User.create({
      name, about, avatar, email, password: hash,
    })
      .catch((err) => {
        if (err.code === 11000) {
          throw new ConflictError();
        }
      })
      .then((user) => { res.send(user); })
      .catch(next)
    ));
};

export const getUserById = (req: IRequest, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.find({ _id: userId })
    .then(([user]) => {
      if (!user) {
        throw new NotFoundError();
      }

      res.send(user);
    })
    .catch(next);
};

export const patchUserProfile = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);

  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidator: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUserAvatar = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);

  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidator: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError();
      }

      return bcrypt.compare(password, user.password).then((matched:boolean) => {
        if (!matched) {
          throw new UnauthorizedError();
        }

        return user;
      });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, PASS_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

export const getUserInfo = (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);

  User.find({ _id })
    .then(([users]) => res.send(users))
    .catch(next);
};
