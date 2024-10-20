import { Request } from 'express';
import jwt from 'jsonwebtoken';

//
import messages from 'src/utils/messages.json';

//
export const verifyToken: IVerifyToken = (req) => {
    return new Promise((resolve) => {
        const requestToken = req.headers.authorization?.split(' ')?.[1];
        if (!requestToken) throw new Error(messages.responses.tokenNotFound);

        jwt.verify(
            requestToken,
            process.env.SECRET_KEY!,
            {
                ignoreExpiration: process.env.MODE === 'test',
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (err, payload: any) => {
                if (err) throw err;
                resolve(payload);
            }
        );
    });
};

export const generateRefreshTokenByToken: IGenerateRefreshToken = (req) => {
    return new Promise((resolve) => {
        verifyToken(req).then((result) => {
            const token = generateToken({
                id: result.id,
            });
            resolve(token);
        });
    });
};

export const generateToken: IGenerateToken = (data) => {
    const token = jwt.sign(
        data,
        process.env.SECRET_KEY!,
        process.env.MODE === 'test'
            ? {}
            : {
                  expiresIn: process.env.EXPIRES_IN,
              }
    );
    return token;
};

export type IVerifyToken = (
    req: Request
) => Promise<Record<string, string | number | boolean>>;

export type IGenerateToken = (
    data: Record<string, string | number | boolean>
) => string;

export type IGenerateRefreshToken = (req: Request) => Promise<string>;
