import nodemailer from 'nodemailer';

const configOptions = {
    host: process.env.MAIL_HOST,
    secure: process.env.MAIL_SECURE === 'true',
    port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT!) : 587,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PWD,
    },
};

export const transporter = nodemailer.createTransport(configOptions);

const createTestTransporter = async () => {
    const testAccount = await nodemailer.createTestAccount();

    const configOptions = {
        host: testAccount.smtp.host,
        secure: testAccount.smtp.secure,
        port: testAccount.smtp.port,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    };

    return nodemailer.createTransport(configOptions);
};

export const testTransporter = createTestTransporter();
