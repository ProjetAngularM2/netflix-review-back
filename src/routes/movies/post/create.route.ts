import { HTTPHandlerResponse, OnPost, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MOVIE_PAYLOAD, MOVIE_RESPONSE} from '../../../schemas';
import {MoviesService} from '../../../services';

@Route({
    path: '/api/movies',
    method: 'POST',
    config: {
        validate: {
            payload: MOVIE_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: MOVIE_RESPONSE
            }
        },
        description: 'Create one movie',
        notes: 'Create a new movie and returns it',
        tags: [ 'api', 'movies' ]
    }
})
export class PostCreateMovieRoute implements OnPost {
    /**
     * Class constructor
     * @param _moviesService
     * @param _logger
     */
    constructor(private _moviesService: MoviesService, private _logger: LoggerService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._moviesService.create(request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
