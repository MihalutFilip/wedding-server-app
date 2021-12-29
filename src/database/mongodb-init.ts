import { Logger } from "../utils/logger";
import { DBCollections, DBConfigurations } from "./mongodb-configurations";

export const initMongoDB = async () => {

    var MongoClient = require('mongodb').MongoClient;

    await MongoClient.connect(DBConfigurations.CONNECTION_STRING, async function (err: any, client: any) {
        try {
            if (err) throw err;

            var database = client.db(DBConfigurations.DATABASE_NAME);

            const requiredCollections = Object.values(DBCollections);
            const existingCollections = (await database?.listCollections().toArray())?.map((coll: any) => coll.name);

            const collectionsToInsert = requiredCollections.filter((coll) => existingCollections.includes(coll) === false);
            const insertCollPromises = collectionsToInsert.map((coll) => database?.createCollection(coll));

            await Promise.all(insertCollPromises);

            Logger.info("MongoDD collections created and ready to be used");

            client.close();

        } catch (err: Error | any) {
            Logger.error(err);
        }
    });
}