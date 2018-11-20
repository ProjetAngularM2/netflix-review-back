import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MOVIES_RESPONSE} from '../../../schemas';
import {MoviesService} from '../../../services';
import {Movie} from '../../../interfaces';

@Route({
    path: '/api/movies',
    method: 'GET',
    config: {
        response: {
            status: {
                200: MOVIES_RESPONSE
            }
        },
        description: 'Get all movies',
        notes: 'Returns an array of movies or 204',
        tags: [ 'api', 'movies' ]
    }
})
export class GetAllMoviesRoute implements OnGet {
    /**
     * Class constructor
     * @param _moviesService
     * @param _logger
     */
    constructor(private _moviesService: MoviesService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Movie[]| void> {
        return this._moviesService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
