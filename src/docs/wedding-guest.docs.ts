import { OpenAPIV3 } from 'openapi-types';
import { Guest } from '../models/guest';

export const weddingGuestDocs: OpenAPIV3.PathsObject = {
  '/wedding-guests': {
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
    post: {
      tags: ['wedding-guests'],
      operationId: 'addOrUpdateGuests',
      description: '',
      responses: {
        default: {
          description: "Should add or update a list of guests on wedding",
        },
      },
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Mihalut Filip',
                  },
                  confirmationType: {
                    type: 'integer',
                    example: '2',
                  }
                },
              }
            },
          },
        },
        required: true,
      },
    }
  },

};