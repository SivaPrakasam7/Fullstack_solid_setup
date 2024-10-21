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
