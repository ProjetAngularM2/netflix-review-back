import { OnDelete, Request, Route } from '@hapiness/core';
import { Observable } from 'rxjs';
import { ID_PARAMETER } from '../../../schemas';
import {MoviesService} from '../../../services';

@Route({
    path: '/api/movies/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        description: 'Delete one movie',
        notes: 'Delete one movie for the given id in path parameter and returns 204',
        tags: [ 'api', 'movies' ]
    }
})
export class DeleteOneMovieRoute implements OnDelete {
    /**
     * Class constructor
     * @param _moviesService
     */
    constructor(private _moviesService: MoviesService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._moviesService.delete(request.params.id);
    }
}
