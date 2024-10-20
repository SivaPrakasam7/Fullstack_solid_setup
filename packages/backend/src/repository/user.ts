import { executeQuery } from 'src/handler/db.ts';

export const createUserRepo = async ({
    userId,
    name,
    email,
    profileURL,
    passwordHash,
    providerId,
    secretKey,
}: IUser) => {
    const query = `INSERT INTO users (userId, name, email, profileURL, passwordHash, providerId, secretKey) VALUES(?, ?, ?, ?, ?, ?, ?)`;

    const queryResponse = await executeQuery(query, [
        userId,
        name,
        email,
        profileURL,
        passwordHash,
        providerId,
        secretKey,
    ]);

    const verificationQuery = `INSERT INTO verifications (source) VALUES(?)`;

    const verificationQueryResponse = await executeQuery(verificationQuery, [
        email,
    ]);

    return queryResponse.insertId && verificationQueryResponse.insertId;
};

export const updateVerification = async (source: string) => {
    const query = `UPDATE verifications SET verified=1 WHERE source=?`;

    const queryResponse = await executeQuery(query, [source]);

    return queryResponse.affectedRows;
};

export const getUserBySourceRepo = async ({ email }: Pick<IUser, 'email'>) => {
    const query = `SELECT * FROM users WHERE email=? AND isDeleted=0`;

    const queryResponse = await executeQuery(query, [email]);

    return queryResponse[0];
};

export const checkUserVerifiedRepo = async (source: string) => {
    const query = `SELECT count(*) AS count FROM verifications WHERE source=? AND verified=1 AND isDeleted=0`;

    const queryResponse = await executeQuery(query, [source]);

    return queryResponse[0].count;
};

export const getUserByIdRepo = async (userId: string) => {
    const query = `SELECT * FROM users WHERE userId=?`;

    const queryResponse = await executeQuery(query, [userId]);

    return queryResponse[0];
};

export const updatePasswordRepo = async (
    userId: string,
    passwordHash: string
) => {
    const query = `UPDATE users SET passwordHash=? WHERE userId=?`;

    const queryResponse = await executeQuery(query, [passwordHash, userId]);

    return queryResponse.affectedRows;
};

export interface IUser {
    userId: string;
    name: string | null;
    email: string | null;
    profileURL: string | null;
    passwordHash: string | null;
    providerId: string | null;
    secretKey: string;
}
