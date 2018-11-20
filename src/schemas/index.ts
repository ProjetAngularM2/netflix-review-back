import * as Joi from 'joi';


export const ID_PARAMETER = Joi.string().required();

export const USER_PAYLOAD = Joi.object().keys({
    id: ID_PARAMETER,
    login: Joi.string().min(4).required(),
    password: Joi.string().min(5).required()
});

export const USER_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    login: Joi.reach(USER_PAYLOAD, 'login').required(),
    password: Joi.reach(USER_PAYLOAD, 'password').required()
});

export const RATINGS = Joi.object().keys({
    Source: Joi.string(),
    Value: Joi.string()
});

export const MOVIE_PAYLOAD = Joi.object().keys({
    id: ID_PARAMETER,
    Title: Joi.string().required(),
    Year: Joi.string().regex(/^\d{4}$/).required(),
    Genre: Joi.string().required(),
    Plot: Joi.string().required(),
    Poster: Joi.string().required(),
    Ratings: Joi.array().items(RATINGS),
    Metascore: Joi.string().regex(/^\d{1,3}$/).required()
});

export const MOVIE_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    Title: Joi.reach(MOVIE_PAYLOAD, 'Title'),
    Year: Joi.reach(MOVIE_PAYLOAD, 'Year'),
    Genre: Joi.reach(MOVIE_PAYLOAD, 'Genre'),
    Plot: Joi.reach(MOVIE_PAYLOAD, 'Plot'),
    Poster: Joi.reach(MOVIE_PAYLOAD, 'Poster'),
    Ratings: Joi.reach(MOVIE_PAYLOAD, 'Ratings'),
    Metascore: Joi.reach(MOVIE_PAYLOAD, 'Metascore')
});

export const MOVIES_RESPONSE = Joi.array().items(MOVIE_RESPONSE).unique().min(1);

