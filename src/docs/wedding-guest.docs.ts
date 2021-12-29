import { OpenAPIV3 } from 'openapi-types';
import { Guest } from '../models/guest';

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
    post: {
      tags: ['wedding-guest'],
      operationId: 'addGuest',
      description: '',
      responses: {
        default: {
          description: "Should add a guest on wedding",
        },
      },
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Mihalut Filip',
                },
                numberOfPersons: {
                  type: 'integer',
                  example: '3',
                },
                confirmationType: {
                  type: 'integer',
                  example: '2',
                }
              },
            },
          },
        },
        required: true,
      },
      // parameters: [
      //   {
      //     "name": "body",
      //     "paramType": "body",
      //     "description": "body for the POST request",
      //     "required": false
      //   }
      // ]
    }
  },

};

const createGuestBody = {

};
