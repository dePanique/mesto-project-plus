import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IRequest } from '../types/express';
import User from '../models/user';
import { pullUserId } from '../utils/utils';
import { errorMessages, PASS_KEY } from '../utils/constants';
import MestoErrors from '../errors/mesto-errors';

export const getUsers = (_: Request, res: Response, next: NextFunction) => (User.find({})
  .then((users) => res.send(users))
  .catch(next)
);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email,
  } = req.body;

  await bcrypt.hash(req.body.password, 10)
    .then((hash: string) => (User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => { res.send(user); })
      .catch(next)
    ));
};

export const getUserById = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);
  const { userId } = req.params;

  if (_id !== userId) {
    next(new MestoErrors(errorMessages.accessDenied, 403));
  }

  await User.find({ _id })
    .then(([user]) => {
      if (!user) {
        throw new MestoErrors(errorMessages.dataNotFound, 404);
      }

      res.send(user);
    })
    .catch(next);
};

export const patchUserProfile = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);

  if (!_id) {
    next(new MestoErrors(errorMessages.errorOccured, 500));
  }

  const { name, about } = req.body;

  await User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidator: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUserAvatar = async (req: IRequest, res: Response, next: NextFunction) => {
  const _id = pullUserId(req);
  if (!_id) {
    next(new MestoErrors(errorMessages.errorOccured, 500));
  }

  const { avatar } = req.body;

  await User.findByIdAndUpdate(
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
        next(new MestoErrors('Неправильные почта или пароль', 404));
      }

      if (!user?.password) {
        throw new MestoErrors(errorMessages.errorOccured, 500);
      }

      return bcrypt.compare(password, user?.password).then((matched:boolean) => {
        if (!matched) {
          next(new MestoErrors('Неправильные почта или пароль', 404));
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
    .then((users) => res.send(users))
    .catch(next);
};
