import {OnGet, Route, Request} from '@hapiness/core';
import { MoviesService } from '../../../services';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {Movie} from '../../../interfaces';
import {tap} from 'rxjs/operators';
import {ID_PARAMETER, MOVIE_RESPONSE} from '../../../schemas';

@Route({
    path: '/api/movies/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: MOVIE_RESPONSE
            }
        },
        description: 'Get one movie',
        notes: 'Returns one movie for the given id in path parameter',
        tags: ['api', 'movies']
    }
})
export class GetOneMovieRoute implements OnGet {


    constructor(private _moviesService: MoviesService, private _logger: LoggerService) {}

    onGet(request: Request): Observable<Movie> {
        return this._moviesService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}

