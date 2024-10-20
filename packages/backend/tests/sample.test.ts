import request from 'supertest';
import app from 'src';
import { MYSQLConnection } from 'src/handler/db.ts';

describe('Sample API', () => {
    afterAll(async () => {
        await MYSQLConnection.closePool();
    });

    it('responds with json', async () => {
        const response = await request(app).get('/v1/sample');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            data: [{ id: 1, name: 'siva' }],
        });
    });
});
