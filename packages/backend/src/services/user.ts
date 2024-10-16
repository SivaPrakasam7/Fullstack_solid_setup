import { IService } from 'src/handler/middleware';
import {
    generatePasswordHash,
    verifyPassword,
} from 'src/libraries/passwordGenerator';
import { generateToken } from 'src/libraries/tokenGenerator';
import {
    checkUserVerifiedRepo,
    createUserRepo,
    getUserByIdRepo,
    getUserBySourceRepo,
} from 'src/repository/user';
import { generateSecretKey, generateUserId } from 'src/utils';

//
import messages from 'src/utils/messages.json';

//
export const createUserService: IService<string> = async (data) => {
    const isSourceVerified = await checkUserVerifiedRepo(
        data.email || data.phoneNo
    );

    if (!isSourceVerified) throw new Error(messages.responses.unverifiedUser);

    const userId = generateUserId();
    const secretKey = generateSecretKey();
    let passwordHash = null;
    if (data.password) {
        passwordHash = await generatePasswordHash(data.password);
    }

    const result = await createUserRepo({
        userId,
        secretKey,
        passwordHash,
        email: data.email,
        phoneNo: data.phoneNo,
        profileURL: data.profileURL,
        providerId: data.providerId,
    });

    if (!result) throw new Error(messages.responses.failedToCreateUser);

    const token = await generateToken({ userId, secretKey });
    return token;
};

export const loginService: IService<string> = async (data) => {
    const user = await getUserBySourceRepo({
        email: data.email,
        phoneNo: data.phoneNo,
    });

    if (!user) throw new Error(messages.responses.userNotFound);

    if (!user.password) throw new Error(messages.responses.noPasswordAuth);

    const isPasswordVerified = await verifyPassword(
        data.password,
        user.passwordHash
    );

    if (!isPasswordVerified) throw new Error(messages.responses.invalidCred);

    const isSourceVerified = await checkUserVerifiedRepo(
        data.email || data.phoneNo
    );

    if (!isSourceVerified) throw new Error(messages.responses.unverifiedUser);

    const token = await generateToken({
        userId: user.userId,
        secretKey: user.secretKey,
    });
    return token;
};

export const getUserService: IService<Record<string, string>> = async (
    data
) => {
    const userDetail = await getUserByIdRepo(data.id);
    return userDetail;
};
