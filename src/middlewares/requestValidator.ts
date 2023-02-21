import { celebrate, Joi } from 'celebrate';
// eslint-disable-next-line
const avatarRegExp = new RegExp(/^http[s]?:\/\/(www\.)?[A-Za-z0-9-._~:\/?#@!$&'()*+,;=]{1,}\.[A-Za-z0-9]{1,}\b[-a-zA-Z0-9-._~:\/?#@!$&'()*+,;=]*$/);

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(10),
    name: Joi.string().min(3).max(14),
    about: Joi.string().min(3).max(50),
    avatar: Joi.string().regex(avatarRegExp),
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(10),
  }),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24).max(24),
  }),
});

export const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(14),
    about: Joi.string().min(3).max(50),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(avatarRegExp),
  }),
});

export const getUserInfoValidator = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().min(24).max(24),
  }),
});

export const postCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(14),
    link: Joi.string().required(),
  }),
});

export const deleteCardByIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
});

export const putLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
});

export const deleteLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24),
  }),
});

export default signupValidator;
