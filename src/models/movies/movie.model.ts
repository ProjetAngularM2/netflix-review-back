import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';


@MongoModel({
    adapter: 'mongoose',
    collection: 'movie'
})
export class MovieModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(MovieModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema //TODO améliorer schema
        this.schema = new dao.Schema({
                Title: {
                    type: String,
                    trim: true
                },
                Year: {
                    type: String,
                    minlength: 4,
                    maxlength: 4,
                    trim: true
                },
                Rated: {
                    type: String,
                    trim: true
                },
                Released: {
                    type: String,
                    trim: true
                },
                Runtime: {
                    type: String,
                    trim: true
                },
                Genre: {
                    type: String,
                    trim: true
                },
                Director: {
                    type: String,
                    trim: true
                },
                Writer: {
                    type: String,
                    trim: true
                },
                Actors: {
                    type: String,
                    trim: true
                },
                Plot: {
                    type: String,
                    trim: true
                },
                Language: {
                    type: String,
                    trim: true
                },
                Country: {
                    type: String,
                    trim: true
                },
                Awards: {
                    type: String,
                    trim: true
                },
                Poster: {
                    type: String,
                    trim: true
                },
                Ratings: {
                    source: {
                        type: String,
                        trim: true
                    },
                    value: {
                        type: String,
                        trim: true
                    }
                },
                Metascore: {
                    type: String,
                    trim: true
                },
                imdbRating: {
                    type: String,
                    trim: true
                },
                imdbVotes: {
                    type: String,
                    trim: true
                },
                imdbID: {
                    type: String,
                    trim: true
                },
                Type: {
                    type: String,
                    trim: true
                },
                DVD: {
                    type: String,
                    trim: true
                },
                BoxOffice: {
                    type: String,
                    trim: true
                },
                Production: {
                    type: String,
                    trim: true
                },
                Website: {
                    type: String,
                    trim: true
                },
                Response: {
                    type: String,
                    trim: true
                }
            }
        , {
            versionKey: false
        });

        // implement virtual method toJSON to delete _id field and stringify all ObjectId field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    if (!!ret.managerId) {
                        ret.managerId = doc.managerId.toString();
                    }
                    return ret;
                }
            }
        );
    }
}
