const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FundooNotes API',
      version: '1.0.0',
      description: 'API documentation for FundooNotes app',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: ['./docs/*.js'], // All route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;