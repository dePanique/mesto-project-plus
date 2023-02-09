import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';

import { IRequest } from './types/express';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import baseRouter from './routes/base';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: IRequest, _: Response, next: NextFunction) => {
  req.user = {
    _id: '63e154506ef766d9d5451fb0',
  };

  next();
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', baseRouter);

app.listen(3000, () => console.log('online'));
