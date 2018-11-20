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
                    trim: true,
                    required: true
                },
                Year: {
                    type: String,
                    match: /^\d{4}$/,
                    trim: true,
                    required: true
                },
                Genre: {
                    type: String,
                    trim: true,
                    required: true
                },
                Plot: {
                    type: String,
                    trim: true,
                    required: true
                },
                Poster: {
                    type: String,
                    trim: true,
                    required: true
                },
                Ratings: {
                    Source: {
                        type: String,
                        trim: true
                    },
                    Value: {
                        type: String,
                        trim: true
                    }
                },
                Metascore: {
                    type: String,
                    match: /^\d{1,3}$/,
                    trim: true,
                    required: true
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
