import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campaign Manager API',
      version: '1.0.0',
      description: 'API for managing campaigns',
    },
  },
  apis: ['./pages/api/campaigns/*.js'],
};

const specs = swaggerJsdoc(options);

export default function handler(req, res) {
  return swaggerUi.setup(specs)(req, res);
}

export const config = {
  api: {
    externalResolver: true,
  },
};