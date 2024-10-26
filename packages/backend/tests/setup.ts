import nodemailer from 'nodemailer';
import nodemailerMock from 'nodemailer-mock';

jest.mock('nodemailer', () => ({
    ...jest.requireActual('nodemailer'),
    createTransport: jest.fn(),
}));

(nodemailer.createTransport as jest.Mock).mockReturnValue(
    nodemailerMock.createTransport()
);
