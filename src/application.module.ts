import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import {SwagModule} from '@hapiness/swag';
import {Config} from '@hapiness/config';
import {MongoClientService, MongoModule} from '@hapiness/mongo';
import {UserModel} from './models/users';
import {UsersDocumentService} from './services/users-document.service';
import {UsersService} from './services/users.service';
import {PostCreateUserRoute} from './routes/users/post';

const usersDocumentServiceFactory = (mongoClientService: MongoClientService) => new UsersDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        UserModel,
        PostCreateUserRoute
    ],
    providers: [
        HttpServerService,
        UsersService,
        { provide: UsersDocumentService, useFactory: usersDocumentServiceFactory, deps: [ MongoClientService ] }
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param _httpServer
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
