import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Wiz Platform API',
            version: '1.0.0',
            description: 'API documentation for the Wiz Platform - International Transfers & Multi-currency Accounts',
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}/api/v1`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API docs
};
export const swaggerSpec = swaggerJsdoc(options);
//# sourceMappingURL=swagger.js.map