import { celebrate, Joi } from 'celebrate';

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(3).max(14),
    about: Joi.string().min(3).max(50),
    avatar: Joi.string(),
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24),
  }),
});

export const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(14),
    about: Joi.string().required().min(3).max(50),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

export const getUserInfoValidator = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().min(24),
  }),
});

export const postCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(14),
    link: Joi.string().required(),
  }),
});

export const deleteCardByIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
  body: Joi.object().keys({

  }),
});

export const putLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
});

export const deleteLikeOnCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24),
  }),
});

export default signupValidator;
