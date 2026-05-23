import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../utils/jwt.js';
import { AppError } from '../middleware/error.middleware.js';
export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return next(new AppError('Please provide email, password and name!', 400));
        }
        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return next(new AppError('User already exists with this email!', 400));
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        // Remove password from output
        const { password: _, ...userWithoutPassword } = newUser;
        // Create token
        const token = signToken(newUser.id);
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: userWithoutPassword,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }
        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }
        // Create token
        const token = signToken(user.id);
        // Remove password from output
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: userWithoutPassword,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMe = async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
};
//# sourceMappingURL=auth.controller.js.map