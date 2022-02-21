import { OpenAPIV3 } from 'openapi-types';
import { Guest } from '../models/guest';

export const weddingGuestDocs: OpenAPIV3.PathsObject = {
  '/wedding-guests': {
    get: {
      tags: ['wedding-guests'],
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
                confirmationType: {
                  type: 'integer',
                  example: '2',
                },
                isChild: {
                  type: 'boolean',
                  example: 'false',
                }
              },
            },
          },
        },
        required: true,
      },
    },
    put: {
      tags: ['wedding-guests'],
      operationId: 'updateGuest',
      description: '',
      responses: {
        default: {
          description: "Should update a guest on wedding",
        },
      },
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                name: {
                  type: 'string',
                  example: 'Mihalut Filip',
                },
                confirmationType: {
                  type: 'integer',
                  example: '2',
                },
                isChild: {
                  type: 'boolean',
                  example: 'false',
                }
              },
            },
          },
        },
        required: true,
      },
    },

  },
  '/wedding-guests/addOrUpdate': {
    post: {
      tags: ['wedding-guests'],
      operationId: 'addOrUpdateGuest',
      description: '',
      responses: {
        default: {
          description: "Should add or update a guest on wedding with email confirmation",
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
                confirmationType: {
                  type: 'integer',
                  example: '2',
                },
                isChild: {
                  type: 'boolean',
                  example: 'false',
                },
                message: {
                  type: 'string',
                  example: 'Happy wedding'
                }
              },
            },
          },
        },
        required: true,
      },
    },
  },
  '/wedding-guests/{id}': {
    get: {
      tags: ['wedding-guests'],
      operationId: 'getGuest',
      description: '',
      responses: {
        default: {
          description: "Should get a guest on wedding",
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ]
    },
    delete: {
      tags: ['wedding-guests'],
      operationId: 'deleteGuest',
      description: '',
      responses: {
        default: {
          description: "Should delete guest on wedding",
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ]
    }
  }
};