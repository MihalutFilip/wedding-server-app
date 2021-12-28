import { OpenAPIV3 } from 'openapi-types';

export const weddingGuestDocs: OpenAPIV3.PathsObject = {
  '/wedding-guest': {
    get: {
      tags: ['wedding-guest'],
      operationId: 'getAllGuests',
      description: '',
      responses: {
        default: {
          description: "Should return all guests on wedding",
        },
      },
    },
  },
};
