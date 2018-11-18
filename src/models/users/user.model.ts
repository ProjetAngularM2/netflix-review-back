import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';

@MongoModel({
    adapter: 'mongoose',
    collection: 'user'
})
export class UserModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(UserModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            login: {
                type: String,
                required: true,
                minlength: 4,
                trim: true
            },
            password: {
                type: String,
                required: true,
                minlength: 5,
                trim: true
            }
        }, {
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
