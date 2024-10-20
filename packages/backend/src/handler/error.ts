import { logErrorToFile } from 'src/handler/logger';
import { IErrorHandler } from 'src/handler/middleware';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: IErrorHandler = (error, _req, res, _next) => {
    logErrorToFile(error);
    res.status(500).send({
        message: 'Something went wrong',
        error: true,
    });
};
