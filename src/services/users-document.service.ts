import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces';
import { UserModel } from '../models/users';

@Injectable()
export class UsersDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, UserModel);
    }


    create(user: User): Observable<User> {
        return from(this._document.create(user))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    login(user: User): Observable<User> {
        return from(this._document.find({'login': user.login, 'password': user.password})).pipe(
            map((doc: User) => !!doc ? doc : undefined)
        );
    }

}
