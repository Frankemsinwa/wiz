import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export const signToken = (id) => {
    // @ts-ignore - signOptions types can be picky with string vs number for expiresIn
    return jwt.sign({ id }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
};
export const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map