import { executeQuery } from 'src/handler/db.ts';

export const createUserRepo = async ({
    userId,
    email,
    phoneNo,
    profileURL,
    passwordHash,
    providerId,
    secretKey,
}: IUser) => {
    const query = `INSERT INTO users (userId, email, phoneNo, profileURL, passwordHash, providerId, secretKey) VALUES(?, ?, ?, ?, ?, ?)`;

    const queryResponse = await executeQuery(query, [
        userId,
        email,
        phoneNo,
        profileURL,
        passwordHash,
        providerId,
        secretKey,
    ]);

    return queryResponse.insertId;
};

export const getUserBySourceRepo = async ({
    email,
    phoneNo,
}: Pick<IUser, 'email' | 'phoneNo'>) => {
    const query = `SELECT * FROM users WHERE (email=? OR phoneNo=?) AND isDeleted=0`;

    const queryResponse = await executeQuery(query, [email, phoneNo]);

    return queryResponse[0];
};

export const checkUserVerifiedRepo = async (source: string) => {
    const query = `SELECT count(*) FROM verifications WHERE source=? AND verified=1 AND isDeleted=0`;

    const queryResponse = await executeQuery(query, [source]);

    return queryResponse[0];
};

export const getUserByIdRepo = async (userId: string) => {
    const query = `SELECT * FROM users WHERE userId=?`;

    const queryResponse = await executeQuery(query, [userId]);

    return queryResponse[0];
};

export interface IUser {
    userId: string;
    email: string | null;
    phoneNo: string | null;
    profileURL: string | null;
    passwordHash: string | null;
    providerId: string | null;
    secretKey: string;
}
