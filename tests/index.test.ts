import request from 'supertest';
import {server } from '../src/server'; // import your server


describe('Server status', () => {
    it('should be running', async () => {
        const response = await request(server).get('/'); // replace '/' with a known endpoint if necessary
        expect(response.status).toBe(200);
    });
});

describe('GraphQL Yoga Server', () => {
    it('should return the correct data for a query', async () => {
        const response = await request(server)
            .post('/')
            .send({
                query: '{ allCompany { name } }' // replace with your query
            })
            .expect(200);

        expect(response.body.data.allCompany).toHaveLength(3);
    });
});


afterAll(done => {
    server.close(done);
});