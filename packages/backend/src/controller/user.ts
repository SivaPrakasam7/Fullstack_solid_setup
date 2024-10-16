import type { IError, IMiddleWare } from 'src/handler/middleware';
import { createUserService } from 'src/services/user';

export const createUserController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const token = await createUserService(data);

        res.status(200).json({ data: { token } });
    } catch (e) {
        next(e as IError);
    }
};
