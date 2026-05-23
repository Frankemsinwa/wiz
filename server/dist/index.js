import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { logger } from './utils/logger.js';
import authRoutes from './routes/auth.routes.js';
import accountRoutes from './routes/account.routes.js';
import adminRoutes from './routes/admin.routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
const app = express();
const PORT = env.PORT;
// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/admin', adminRoutes);
app.get('/health', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        service: 'Wiz Platform Backend',
        env: env.NODE_ENV
    });
});
// Error Handling
app.use(globalErrorHandler);
// Start Server
app.listen(PORT, () => {
    logger.info(`⚡️ [server]: Backend is running in ${env.NODE_ENV} mode at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map