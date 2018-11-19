import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import {SwagModule} from '@hapiness/swag';
import {Config} from '@hapiness/config';
import {MongoClientService, MongoModule} from '@hapiness/mongo';
import {UserModel} from './models/users';
import {UsersDocumentService, UsersService} from './services';
import {PostCreateUserRoute} from './routes/users/post';
import {MovieModel} from './models/movies';
import {DeleteOneMovieRoute} from './routes/movies/delete';
import {GetAllMoviesRoute, GetOneMovieRoute} from './routes/movies/get';
import {PutUpdateMovieRoute} from './routes/movies/put';
import {MoviesDocumentService, MoviesService} from './services';
import {PostCreateMovieRoute} from './routes/movies/post';

const usersDocumentServiceFactory = (mongoClientService: MongoClientService) => new UsersDocumentService(mongoClientService);
const moviesDocumentServiceFactory = (mongoClientService: MongoClientService) => new MoviesDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        UserModel,
        MovieModel,
        PostCreateUserRoute,
        DeleteOneMovieRoute,
        GetAllMoviesRoute,
        GetOneMovieRoute,
        PostCreateMovieRoute,
        PutUpdateMovieRoute
    ],
    providers: [
        HttpServerService,
        UsersService,
        MoviesService,
        { provide: UsersDocumentService, useFactory: usersDocumentServiceFactory, deps: [ MongoClientService ] },
        { provide: MoviesDocumentService, useFactory: moviesDocumentServiceFactory, deps: [ MongoClientService ] }
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
