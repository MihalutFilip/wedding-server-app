import { DBCollections, DBConfigurations } from '../database/mongodb-configurations';

var MongoClient = require('mongodb').MongoClient;

export class BaseRepository {
    protected session: any;
    protected database: any;
    protected options: any;

    private client: any;

    public async startTransaction() {
        var client = await this.getClient();
        this.session = client.startSession();

        this.session.startTransaction();

        // Setup options
        this.options = { session: this.session, returnOriginal: false };
    }

    public async commitTransaction() {
        await this.session.commitTransaction();
        this.session.endSession();
    }

    public async abortTransaction() {
        await this.session.abortTransaction();
        this.session.endSession();
    }

    private async getClient() {
        if (this.client == null) {
            this.client = await MongoClient.connect(DBConfigurations.CONNECTION_STRING);
            this.database = this.client.db(DBConfigurations.DATABASE_NAME);
        }

        return this.client;
    }
}