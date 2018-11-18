import * as Joi from 'joi';


export const ID_PARAMETER = Joi.string().required();

export const USER_PAYLOAD = Joi.object().keys({
    login: Joi.string().min(4).required(),
    password: Joi.string().min(5).required()
});

export const USER_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    login: Joi.reach(USER_PAYLOAD, 'login'),
    password: Joi.reach(USER_PAYLOAD, 'password')
});


