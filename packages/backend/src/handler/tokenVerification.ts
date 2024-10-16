import { IMiddleWare } from 'src/handler/middleware';
import { getAuth } from 'src/libraries/firebase';
import { verifyToken } from 'src/libraries/tokenGenerator';

//
import messages from 'src/utils/messages.json';

//
export const tokenChecker: IMiddleWare = async (req, _, next) => {
    const result = await verifyToken(req);

    req.body = {
        ...result,
        ...req.body,
    };

    next();
};

export const providerTokenChecker: IMiddleWare = async (req, _, next) => {
    const requestToken = req.headers.authorization?.split(' ')?.[1];

    if (!requestToken) throw new Error(messages.responses.tokenNotFound);

    await getAuth()
        .verifyIdToken(requestToken)
        .then((decodedToken) => {
            const providerId = decodedToken.uid;
            const name = decodedToken.name;
            const email = decodedToken.email;

            req.body = {
                ...{
                    providerId,
                    name,
                    email,
                },
                ...req.body,
            };

            next();
        });
};
