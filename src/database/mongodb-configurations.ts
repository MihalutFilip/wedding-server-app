import { serverConfig } from '../configs/server.config';

export class DBConfigurations {
    public static readonly DATABASE_NAME: string = 'Wedding';
    public static readonly CONNECTION_STRING: string = <string>serverConfig.DATABASE_URI;
}

export const DBCollections = {
    WEDDING_GUESTS: 'wedding-guests'
}