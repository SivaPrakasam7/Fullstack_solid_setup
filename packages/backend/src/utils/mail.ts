import { readFileData } from 'src/libraries/fileSystem';
import { transporter } from 'src/libraries/mail';
import { renderHTML } from 'src/libraries/renderer';

export const sendMail: ISendMail = async (templatePath, data, config) => {
    const mailConfigurations = {
        from: 'Home management',
        ...config,
    };
    const template = await readFileData(templatePath);
    mailConfigurations.html = renderHTML(template, data);

    return new Promise((resolve) => {
        transporter.sendMail(mailConfigurations, (error, data) => {
            if (error) throw error;
            resolve(data);
        });
    });
};

export type ISendMail = (
    template: string,
    data: Record<string, string | number>,
    config: {
        form?: string;
        to?: string | string[];
        bcc?: string | string[];
        subject: string;
        html?: string;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;
