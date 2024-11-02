import { IMiddleWare } from 'src/handler/middleware';
// import { getAuth } from 'src/libraries/firebase';
import { generateToken, verifyToken } from 'src/libraries/tokenGenerator';
import { createError } from 'src/handler/error';

//
import messages from 'src/utils/messages.json';

//
export const tokenChecker: IMiddleWare = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const accessToken = req.cookies.accessToken;

        if (!refreshToken || !accessToken)
            return next(createError(401, messages.responses.tokenNotFound));

        let result;
        try {
            result = await verifyToken(accessToken);
        } catch {
            result = await verifyToken(refreshToken);

            const newAccessTokenToken = await generateToken(result, true);
            res.cookie('accessToken', newAccessTokenToken, {
                httpOnly: true,
                secure: process.env.MODE === 'production',
                sameSite: 'strict',
            });
        }

        const newRefreshToken = await generateToken(result);

        req.body = {
            ...result,
            ...req.body,
        };

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.MODE === 'production',
            sameSite: 'strict',
        });

        next();
    } catch {
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
        return next(createError(401, messages.responses.tokenExpired));
    }
};

//
export const headerTokenChecker: IMiddleWare = async (req, _, next) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1];
        if (!token) throw createError(401, messages.responses.tokenNotFound);

        const result = await verifyToken(token);

        req.body = {
            ...result,
            ...req.body,
        };

        next();
    } catch {
        return next(createError(401, messages.responses.tokenExpired));
    }
};

// export const providerTokenChecker: IMiddleWare = async (req, _, next) => {
//     const requestToken = req.headers.authorization?.split(' ')?.[1];

//     if (!requestToken) throw createError(400, messages.responses.tokenNotFound);

//     await getAuth()
//         .verifyIdToken(requestToken)
//         .then((decodedToken) => {
//             const providerId = decodedToken.uid;
//             const name = decodedToken.name;
//             const email = decodedToken.email;

//             req.body = {
//                 ...{
//                     providerId,
//                     name,
//                     email,
//                 },
//                 ...req.body,
//             };

//             next();
//         });
// };
