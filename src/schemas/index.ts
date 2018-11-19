import * as Joi from 'joi';


export const ID_PARAMETER = Joi.string().required();

export const USER_PAYLOAD = Joi.object().keys({
    id: ID_PARAMETER,
    login: Joi.string().min(4).required(),
    password: Joi.string().min(5).required()
});

export const USER_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    login: Joi.reach(USER_PAYLOAD, 'login'),
    password: Joi.reach(USER_PAYLOAD, 'password')
});

export const MOVIE_PAYLOAD = Joi.object().keys({
    Title: Joi.string(),
    Year: Joi.string().max(4),
    Rated: Joi.string(),
    Released: Joi.string(),
    Runtime: Joi.string(),
    Genre: Joi.string(),
    Director: Joi.string(),
    Writer: Joi.string(),
    Actors: Joi.string(),
    Plot: Joi.string(),
    Language: Joi.string(),
    Country: Joi.string(),
    Awards: Joi.string(),
    Poster: Joi.string(),
    Ratings: Joi.object().keys({
       source: Joi.string(),
       value: Joi.string()
    }),
    Metascore: Joi.string(),
    imdbRating: Joi.string(),
    imdbVotes: Joi.string(),
    imdbID: Joi.string(),
    Type: Joi.string(),
    DVD: Joi.string(),
    BoxOffice: Joi.string(),
    Production: Joi.string(),
    Website: Joi.string(),
    Response: Joi.string()
});

export const MOVIE_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    Title: Joi.reach(MOVIE_PAYLOAD, 'Title'),
    Year: Joi.reach(MOVIE_PAYLOAD, 'Year'),
    Rated: Joi.reach(MOVIE_PAYLOAD, 'Rated'),
    Released: Joi.reach(MOVIE_PAYLOAD, 'Released'),
    Runtime: Joi.reach(MOVIE_PAYLOAD, 'Runtime'),
    Genre: Joi.reach(MOVIE_PAYLOAD, 'Genre'),
    Director: Joi.reach(MOVIE_PAYLOAD, 'Director'),
    Writer: Joi.reach(MOVIE_PAYLOAD, 'Writer'),
    Actors: Joi.reach(MOVIE_PAYLOAD, 'Actors'),
    Plot: Joi.reach(MOVIE_PAYLOAD, 'Plot'),
    Language: Joi.reach(MOVIE_PAYLOAD, 'Language'),
    Country: Joi.reach(MOVIE_PAYLOAD, 'Country'),
    Awards: Joi.reach(MOVIE_PAYLOAD, 'Awards'),
    Poster: Joi.reach(MOVIE_PAYLOAD, 'Poster'),
    Ratings: Joi.reach(MOVIE_PAYLOAD, 'Ratings'),
    Metascore: Joi.reach(MOVIE_PAYLOAD, 'Metascore'),
    imdbRating: Joi.reach(MOVIE_PAYLOAD, 'imdbRating'),
    imdbVotes: Joi.reach(MOVIE_PAYLOAD, 'imdbVotes'),
    imdbID: Joi.reach(MOVIE_PAYLOAD, 'imdbID'),
    Type: Joi.reach(MOVIE_PAYLOAD, 'Type'),
    DVD: Joi.reach(MOVIE_PAYLOAD, 'DVD'),
    BoxOffice: Joi.reach(MOVIE_PAYLOAD, 'BoxOffice'),
    Production: Joi.reach(MOVIE_PAYLOAD, 'Production'),
    Website: Joi.reach(MOVIE_PAYLOAD, 'Website'),
    Response: Joi.reach(MOVIE_PAYLOAD, 'Response')
});
