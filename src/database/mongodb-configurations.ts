export class DBConfigurations {
    public static readonly DATABASE_NAME: string = 'Wedding';
    public static readonly CONNECTION_STRING: string = "mongodb+srv://<username>:<password>@cluster0.hjvfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
}

export const DBCollections = {
    WEDDING_GUESTS: 'wedding-guests'
}