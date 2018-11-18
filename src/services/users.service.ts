import { Biim } from '@hapiness/biim';
import { HTTPHandlerResponse, Injectable } from '@hapiness/core';

import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces';
import { UsersDocumentService } from './users-document.service';

@Injectable()
export class UsersService {
    /**
     * Class constructor
     */
    constructor(private _usersDocumentService: UsersDocumentService) {
    }


    create(user: User): Observable<HTTPHandlerResponse> {
        return  this._usersDocumentService.create(user)
            .pipe(
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`User with lastname '${user.login}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

}
