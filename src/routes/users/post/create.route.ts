import { HTTPHandlerResponse, OnPost, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { USER_PAYLOAD, USER_RESPONSE } from '../../../schemas';
import { UsersService } from '../../../services/users.service';

@Route({
    path: '/api/users',
    method: 'POST',
    config: {
        validate: {
            payload: USER_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: USER_RESPONSE
            }
        },
        description: 'Create one user',
        notes: 'Create a new user and returns it',
        tags: [ 'api', 'user' ]
    }
})
export class PostCreateUserRoute implements OnPost {
    /**
     * Class constructor
     * @param _userService
     * @param _logger
     */
    constructor(private _usersService: UsersService, private _logger: LoggerService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._usersService.create(request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
