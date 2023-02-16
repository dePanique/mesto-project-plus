import { Request, Response } from 'express';
import { IRequest } from '../types/express';
import User from '../models/user';
import { handleError } from '../utils/utils';

const bcrypt = require('bcrypt');

export const getUsers = (req: Request, res: Response) => (User.find({})
  .then((users) => res.send(users))
  .catch((err) => handleError(err, res))
);

export const createUser = async (req: Request, res: Response) => {
  const {
    name, about, avatar, email,
  } = req.body;

  await bcrypt.hash(req.body.password, 10)
    .then((hash: string) => (User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => { res.send(user); })
      .catch((err) => handleError(err, res))
    ));
};

export const getUserById = async (req: IRequest, res: Response) => {
  const _id = req.user?._id;

  await User.find({ _id })
    .then(([user]) => res.send(user))
    .catch((err) => handleError(err, res));
};

export const patchUserProfile = async (req: IRequest, res: Response) => {
  const _id = req.user?._id;
  const { name, about, avatar } = req.body;

  await User.findByIdAndUpdate(
    _id,
    { name, about, avatar },
    { new: true, runValidator: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

export const updateUserAvatar = async (req: IRequest, res: Response) => {
  const _id = req.user?._id;

  await User.findByIdAndUpdate(
    _id,
    { avatar: 'Hardcode avatar' },
    { new: true, runValidator: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
