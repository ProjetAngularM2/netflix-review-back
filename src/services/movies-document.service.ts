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

    /**
     * recupere dans la base de donnée le film avec l'id donné en parametre
     * @param id
     */
    findById(id: string): Observable<Movie | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * retourne l'ensemble des films présent dans la base de donnée
     */
    find(): Observable<Movie[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * ajoute le film mis en parametre dans la base de donnée
     * @param movie
     */
    create(movie: Movie): Observable<Movie> {
        return from(this._document.create(movie))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    /**
     * trouve le film correspondant a l'id donné puis le met a jour avec la nouvelle valeur
     * @param id
     * @param movie
     */
    findByIdAndUpdate(id: string, movie: Movie): Observable<Movie | void> {
        return from(this._document.findByIdAndUpdate(id, movie, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * trouve le film correspondant a l'id doné puis le supprime de la base de donnée
     * @param id
     */
    findByIdAndRemove(id: string): Observable<Movie | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }




}
