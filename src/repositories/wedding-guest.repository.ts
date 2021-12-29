import { Guest } from "../models/guest";
import { DBCollections, DBConfigurations } from '../database/mongodb-configurations';
import { Logger } from '../utils/logger';

var MongoClient = require('mongodb').MongoClient;

export class WeddingGuestRepository {

    public addGuest = async (guest: Guest) => {
        const client = await MongoClient.connect(DBConfigurations.CONNECTION_STRING, { useNewUrlParser: true });

        var database = client.db(DBConfigurations.DATABASE_NAME);

        var addedGuest = await database.collection(DBCollections.WEDDING_GUESTS).findOne({ name: guest.name });

        if (addedGuest != null)
            throw "Guest already added";

        var addedGuest = await database.collection(DBCollections.WEDDING_GUESTS).insertOne(guest);

        Logger.info("Guest added to collection");

        return addedGuest;
    }
}
