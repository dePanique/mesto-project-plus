import express from 'express';
import mongoose from 'mongoose';
import { requestLogger, errorLogger } from './middlewares/logger';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import baseRouter from './routes/base';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import errors from './middlewares/errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', baseRouter);

app.use(errorLogger);

app.use(errors);

app.listen(3000, () => console.log('online'));
