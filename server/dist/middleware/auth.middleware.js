import { prisma } from '../lib/prisma.js';
import { verifyToken } from '../utils/jwt.js';
import { AppError } from './error.middleware.js';
export const protect = async (req, res, next) => {
    try {
        // 1) Getting token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }
        // 2) Verification token
        const decoded = verifyToken(token);
        // 3) Check if user still exists
        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    }
    catch (error) {
        next(new AppError('Invalid token. Please log in again!', 401));
    }
};
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map