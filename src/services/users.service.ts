import { Biim } from '@hapiness/biim';
import { HTTPHandlerResponse, Injectable } from '@hapiness/core';

import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
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

    login(user: User): Observable<User> {
        return  this._usersDocumentService.login(user)
            .pipe(
                catchError(e =>
                        throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound('Connection error'))
                )
            );
    }

}
