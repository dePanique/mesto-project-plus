import { celebrate, Joi } from 'celebrate';
// eslint-disable-next-line
const urlRegExp = new RegExp(/^http[s]?:\/\/(www\.)?[A-Za-z0-9-._~:\/?#@!$&'()*+,;=]{1,}\.[A-Za-z0-9]{1,}\b[-a-zA-Z0-9-._~:\/?#@!$&'()*+,;=]*$/);

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().min(24)
      .max(24),
  }),
});

export const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegExp),
  }),
});

export const postCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(urlRegExp),
  }),
});

export const deleteCardByIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().min(24)
      .max(24),
  }),
});

export const putLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().min(24)
      .max(24),
  }),
});

export const deleteLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().min(24)
      .max(24),
  }),
});

export default signupValidator;
