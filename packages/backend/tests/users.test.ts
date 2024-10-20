import request from 'supertest';
import app from 'src';
import { executeQuery, MYSQLConnection } from 'src/handler/db.ts';
import { user } from './data';

describe('Users API', () => {
    let payload = {};

    beforeAll(async () => {
        executeQuery('DELETE FROM users');
        executeQuery('ALTER TABLE users AUTO_INCREMENT = 1');
    });

    afterAll(async () => {
        await MYSQLConnection.closePool();
    });

    it('Create user', async () => {
        let response = await request(app).post('/v1/user/create').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
            'Either password or providerId is required'
        );

        payload = {
            password: user.password,
        };
        response = await request(app).post('/v1/user/create').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Email is required');

        payload = {
            email: user.name,
            password: user.password,
        };
        response = await request(app).post('/v1/user/create').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Email must be valid');

        payload = {
            email: user.email,
            password: user.password,
        };
        response = await request(app).post('/v1/user/create').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Name is required');

        payload = {
            email: user.email,
            name: user.name,
            password: user.password,
        };
        response = await request(app).post('/v1/user/create').send(payload);
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
    });

    it('Login user', async () => {
        payload = {};
        let response = await request(app).post('/v1/user/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Password is required');

        payload = {
            password: user.password,
        };
        response = await request(app).post('/v1/user/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Email is required');

        payload = {
            email: user.email,
            password: user.name,
        };
        response = await request(app).post('/v1/user/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Invalid credentials');

        payload = {
            email: user.email,
            password: user.password,
        };
        response = await request(app).post('/v1/user/login').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Account not verified');

        // After email verification
        // response = await request(app).post('/v1/user/login').send(payload);
        // expect(response.status).toBe(200);
        // expect(response.body.token).not.toBeNull();
    });
});
