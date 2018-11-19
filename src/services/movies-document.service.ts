import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {MovieModel} from '../models/movies';
import {MongooseDocument} from 'mongoose';
import {from, Observable} from 'rxjs';
import {Movie} from '../interfaces';
import {map} from 'rxjs/operators';


@Injectable()
export class MoviesDocumentService {

    private _document: any;

    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, MovieModel);
    }

    findById(id: string): Observable<Movie | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    find(): Observable<Movie[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    create(movie: Movie): Observable<Movie> {
        return from(this._document.create(movie))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    findByIdAndUpdate(id: string, movie: Movie): Observable<Movie | void> {
        return from(this._document.findByIdAndUpdate(id, movie, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    findByIdAndRemove(id: string): Observable<Movie | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }

    // TODO ajout d'avis


}
