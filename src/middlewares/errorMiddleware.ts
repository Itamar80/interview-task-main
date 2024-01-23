import { handleFacebookRequestError } from 'errorHandler.ts';
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(error: any, _req: Request, res: Response, next: NextFunction) {
    if (error instanceof Error) {
        handleFacebookRequestError(error, res);
    } else {
        res.status(500).json({ error: 'An unexpected server error occurred.' });
    }
}
