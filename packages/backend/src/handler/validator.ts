import { IError, IValidator } from './middleware';

export const validator: IValidator = (validation) => {
    return async (req, res, next) => {
        try {
            await validation.validate(req.body);

            next();
        } catch (e) {
            res.status(400).json({ message: (e as IError).message });
        }
    };
};
