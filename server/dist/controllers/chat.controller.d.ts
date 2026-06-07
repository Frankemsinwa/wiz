import { Request, Response, NextFunction } from 'express';
export declare const getMyChat: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getChatMessages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const sendMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllChats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserChat: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const sendMessageUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAdminChatByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const sendMessageAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=chat.controller.d.ts.map