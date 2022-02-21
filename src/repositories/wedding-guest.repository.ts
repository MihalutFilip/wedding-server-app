import { Guest } from "../models/guest";
import { DBCollections, DBConfigurations } from '../database/mongodb-configurations';
import { Logger } from '../utils/logger';
import { BaseRepository } from "./base-repository";
import { ObjectId } from "mongodb";
import { GuestAlreadyAddedError, GuestNotFoundError } from "../errors/guest-errors";

export class WeddingGuestRepository extends BaseRepository {

    public async addOrUpdateGuests(guest: Guest) {

        try {
            await super.startTransaction();

            var query = guest._id ? { _id: new ObjectId(guest._id) } : { name: guest.name };

            var addedGuest = await this.database.collection(DBCollections.WEDDING_GUESTS).findOne(query, this.options);

            if (addedGuest == null)
                await this.database.collection(DBCollections.WEDDING_GUESTS).insertOne(guest, this.options);
            else
                await this.database.collection(DBCollections.WEDDING_GUESTS).updateOne(query, { $set: guest }, this.options);

            await super.commitTransaction();

            Logger.info("Guest was updated.");
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }

    public async addGuest(guest: Guest) {

        try {
            await super.startTransaction();

            var response = await this.database.collection(DBCollections.WEDDING_GUESTS).insertOne(guest, this.options);

            await super.commitTransaction();

            Logger.info("Guest added to collection.");

            return response;
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }

    public async updateGuest(guest: Guest) {

        try {
            await super.startTransaction();

            var query = { _id: new ObjectId(guest._id) };

            var addedGuest = await this.database.collection(DBCollections.WEDDING_GUESTS).findOne(query, this.options);

            var updateGuest = <Guest>{
                confirmationType: guest.confirmationType,
                isChild: guest.isChild,
                name: guest.name
            }

            if (addedGuest == null)
                throw new GuestNotFoundError(`Cannot find guest with id ${guest._id} in database.`);
            else
                var response = await this.database.collection(DBCollections.WEDDING_GUESTS).updateOne(query, { $set: updateGuest }, this.options);

            await super.commitTransaction();

            Logger.info("Guest updated.");

            return response;
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }

    public async getGuest(guestId: string) {

        try {
            await super.startTransaction();

            var query = {
                _id: new ObjectId(guestId)
            };

            var response = await this.database.collection(DBCollections.WEDDING_GUESTS).findOne(query, this.options);

            if (response == null)
                throw new GuestNotFoundError(`Cannot find a user with this id.`);

            await super.commitTransaction();

            Logger.info("Guest was found.");

            return response;
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

    public async deleteGuest(_id: string) {
        try {
            await super.startTransaction();

            var query = {
                _id: new ObjectId(_id)
            };

            var guest = await this.database.collection(DBCollections.WEDDING_GUESTS).findOne(query, this.options);

            if (guest == null)
                throw new GuestNotFoundError("Cannot find a user with this id.");

            var response = await this.database.collection(DBCollections.WEDDING_GUESTS).deleteOne(query, this.options);

            await super.commitTransaction();

            return response;
        } catch (error) {
            await super.abortTransaction();
            throw error;
        }
    }
}
