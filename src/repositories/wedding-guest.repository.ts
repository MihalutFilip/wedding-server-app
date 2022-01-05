import { Guest } from "../models/guest";
import { DBCollections, DBConfigurations } from '../database/mongodb-configurations';
import { Logger } from '../utils/logger';
import { BaseRepository } from "./base-repository";

var MongoClient = require('mongodb').MongoClient;

export class WeddingGuestRepository extends BaseRepository {

    public async addOrUpdateGuests(guests: Guest[]) {

        try {
            await super.startTransaction();

            for (var i = 0; i < guests.length; i++) {
                const guest = guests[i];

                var query = guest._id ? { _id: guest._id } : { name: guest.name };

                var addedGuest = await this.database.collection(DBCollections.WEDDING_GUESTS).findOne(query, this.options);

                if (addedGuest == null)
                    await this.database.collection(DBCollections.WEDDING_GUESTS).insertOne(guest, this.options);
                else
                    await this.database.collection(DBCollections.WEDDING_GUESTS).updateOne(query, { $set: guest }, this.options);
            }

            await super.commitTransaction();

            Logger.info("Guest added to collection");
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }

    public async getAllGuests() {
        try {
            await super.startTransaction();

            var guests = await this.database.collection(DBCollections.WEDDING_GUESTS).find({}, this.options).toArray();

            await super.commitTransaction();

            return guests;
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }
}
