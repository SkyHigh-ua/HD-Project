import {type Request, type Response} from 'express';

export const handleError = (err: Error & {status?: number}, req: Request, res: Response) => {
    console.error(err);
    const serverErrorStatus = 500;
    let errorMessage: string;
    const statusCode = err.status ?? serverErrorStatus;

    if (process.env.NODE_ENV === 'production') {
        errorMessage = 'Internal Server Error';
    } else {
        errorMessage = err.message;
    }

    res.status(statusCode).json({error: errorMessage});
};
