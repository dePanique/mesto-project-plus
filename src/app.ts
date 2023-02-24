import express from 'express';
import mongoose from 'mongoose';
import { signupValidator, signinValidator } from './middlewares/request-validator';
import { requestLogger, errorLogger } from './middlewares/logger';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import pageNotFound from './routes/page-not-found';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import mestoErrors from './middlewares/mesto-errors';

const { errors } = require('celebrate');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use('*', auth, pageNotFound);

app.use(errorLogger);

app.use(errors());

app.use(mestoErrors);

app.listen(3000, () => console.log('online'));
