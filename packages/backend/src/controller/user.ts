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

//
import messages from 'src/utils/messages.json';

//
export const createUserController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await createUserService(data);

        res.status(200).json({ message: result });
    } catch (e) {
        next(e as IError);
    }
};

export const loginController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await loginService(data);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.MODE === 'production',
            sameSite: 'strict',
        });
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.MODE === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ data: result });
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

export const logoutController: IMiddleWare = async (req, res, next) => {
    try {
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.MODE === 'production',
            sameSite: 'strict',
        });
        res.cookie('accessToken', '', {
            httpOnly: true,
            secure: process.env.MODE === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: messages.responses.success });
    } catch (e) {
        next(e as IError);
    }
};
