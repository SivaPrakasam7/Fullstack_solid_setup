import type { IError, IMiddleWare } from 'src/handler/middleware';
import {
    changePasswordService,
    createUserService,
    forgotPasswordService,
    getUserService,
    loginService,
    requestVerificationService,
    verificationService,
} from 'src/services/user';

export const createUserController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const token = await createUserService(data);

        res.status(200).json({ data: { token } });
    } catch (e) {
        next(e as IError);
    }
};

export const loginController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const token = await loginService(data);

        res.status(200).json({ data: { token } });
    } catch (e) {
        next(e as IError);
    }
};

export const userController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await getUserService(data);

        res.status(200).json({ data: { user } });
    } catch (e) {
        next(e as IError);
    }
};

export const requestVerifyController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await requestVerificationService(data);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e as IError);
    }
};

export const verifyController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await verificationService(data);

        res.status(200).json({ message: result });
    } catch (e) {
        next(e as IError);
    }
};

export const forgotPasswordController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await forgotPasswordService(data);

        res.status(200).json({ message: result });
    } catch (e) {
        next(e as IError);
    }
};

export const changePasswordController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await changePasswordService(data);

        res.status(200).json({ message: result });
    } catch (e) {
        next(e as IError);
    }
};
