import { createError } from 'src/handler/error';
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
    updatePasswordRepo,
} from 'src/repository/user';
import { generateSecretKey, generateUserId } from 'src/utils';

//
import messages from 'src/utils/messages.json';

//
export const createUserService: IService<string> = async (data) => {
    const user = await getUserBySourceRepo({
        email: data.email,
    });

    if (user) throw createError(400, messages.responses.userAlreadyExist);

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
        name: data.name,
        email: data.email,
        profileURL: data.profileURL,
        providerId: data.providerId,
    });

    if (!result) throw createError(400, messages.responses.failedToCreateUser);

    const token = await generateToken({ userId, secretKey });

    await verificationService({
        userId,
        email: data.email,
    });

    return token;
};

export const loginService: IService<string> = async (data) => {
    const user = await getUserBySourceRepo({
        email: data.email,
    });

    if (!user) throw createError(400, messages.responses.userNotFound);

    if (!user.passwordHash)
        throw createError(400, messages.responses.noPasswordAuth);

    const isPasswordVerified = await verifyPassword(
        data.password,
        user.passwordHash
    );
    if (!isPasswordVerified)
        throw createError(400, messages.responses.invalidCred);

    const isSourceVerified = await checkUserVerifiedRepo(data.email);
    if (!isSourceVerified)
        throw createError(400, messages.responses.unverifiedUser);

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

export const verificationService = async (payload: {
    userId: string;
    email: string;
}) => {
    const verificationToken = await generateToken(payload);
    const emailVerificationLink = `${process.env.PROTOCOL}://${process.env.DOMAIN}/${process.env.VERIFICATION_URL}?token=${verificationToken}`;

    return emailVerificationLink;
};

export const forgotPasswordService: IService<string> = async (data) => {
    const user = await getUserBySourceRepo({
        email: data.email,
    });

    if (!user) throw createError(400, messages.responses.userNotFound);

    const isSourceVerified = await checkUserVerifiedRepo(data.email);

    if (!isSourceVerified)
        throw createError(400, messages.responses.unverifiedUser);

    const token = await generateToken({
        userId: user.userId,
        email: user.email,
    });

    const resetPasswordLink = `${process.env.PROTOCOL}://${process.env.DOMAIN}/${process.env.RESET_PASSWORD_PATH}?token=${token}`;

    return resetPasswordLink;
};

export const changePasswordService: IService<string> = async (data) => {
    const user = await getUserBySourceRepo({
        email: data.email,
    });

    if (!user) throw createError(400, messages.responses.userNotFound);

    const passwordHash = await generatePasswordHash(data.password);

    const result = await updatePasswordRepo(user.email, passwordHash);

    return result;
};
