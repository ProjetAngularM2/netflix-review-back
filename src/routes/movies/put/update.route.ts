import { OnPut, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Movie} from '../../../interfaces';
import {ID_PARAMETER, MOVIE_PAYLOAD, MOVIE_RESPONSE} from '../../../schemas';
import {MoviesService} from '../../../services';

@Route({
    path: '/api/movies/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            },
            payload: MOVIE_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: MOVIE_RESPONSE
            }
        },
        description: 'Update one movie',
        notes: 'Update the movie for the given id in path parameter and returns it',
        tags: [ 'api', 'movies' ]
    }
})
export class PutUpdateMovieRoute implements OnPut {
    /**
     * Class constructor
     * @param _moviesService
     * @param _logger
     */
    constructor(private _moviesService: MoviesService, private _logger: LoggerService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Movie> {
        return this._moviesService.update(request.params.id, request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
