import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {Observable, of, throwError} from 'rxjs';
import {Movie} from '../interfaces';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';
import {MoviesDocumentService} from './movies-document.service';



@Injectable()
export class MoviesService {

    constructor( private _moviesDocumentService: MoviesDocumentService) {}

    one(id: string): Observable<Movie> {
        return this._moviesDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }

    listAll(): Observable<Movie[] | void> {
        return this._moviesDocumentService.find();
    }

    // TODO update et ajouter un avis

    create(movie: Movie): Observable<HTTPHandlerResponse> {
        return of(movie)
            .pipe(
                flatMap(_ => this._moviesDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`The movie with the title : '${movie.Title}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    update(id: string, movie: any): Observable<Movie> {
        return this._moviesDocumentService.findByIdAndUpdate(id, movie)
            .pipe(
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`Movie with the title '${movie.Title}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Movie with id '${id}' not found`))
                )
            );
    }

    delete(id: string): Observable<void> {
        return this._moviesDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`Movie with id '${id}' not found`))
                )
            );
    }

}
