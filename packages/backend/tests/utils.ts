import nodemailerMock from 'nodemailer-mock';
import Mail from 'nodemailer/lib/mailer';

export const waitForEmail = (interval = 1000): Promise<Mail.Options> => {
    return new Promise((resolve) => {
        const checkMail = () => {
            const sentEmails = nodemailerMock.mock.getSentMail();
            const mail = sentEmails[0];
            if (mail) {
                nodemailerMock.mock.reset();
                resolve(mail);
            } else {
                setTimeout(checkMail, interval);
            }
        };

        checkMail();
    });
};
