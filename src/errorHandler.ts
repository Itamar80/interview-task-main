import { RequestError } from 'got';
import { Response } from 'express';

export function handleFacebookRequestError(error: Error, res: Response) {

    if (error instanceof RequestError) {
        const statusCode = error.response?.statusCode;
        const errorCode = error.code;

        if (['ETIMEDOUT', 'ECONNREFUSED'].includes(errorCode)) {
            return res.status(503).json({ error: 'Service temporarily unavailable.' });
        }

        switch (statusCode) {
            case 429:
                return res.status(429).json({ error: 'Too many requests. Please try again later.' });
            case 500:
            case 502:
            case 503:
            case 504:
                return res.status(statusCode).json({ error: `Facebook service error: ${statusCode}.` });
        }

        return res.status(500).json({ error: 'Error occurred during the Facebook API request.' });
    }

    return res.status(500).json({ error: 'Internal server error.' });
}
