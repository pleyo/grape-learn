import request from 'supertest';
import { server } from '../src/server'; // import your server


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

        expect(response.body.data.allCompany.length).toBeGreaterThanOrEqual(3);
    });
    it('should create & delete a company', async () => {
        // First, create a company
        let response = await request(server)
            .post('/')
            .send({
                query: `
                mutation {
                    createCompany(data: { name: "Test Company", address: "123 Test St"}) {
                        id
                        name
                    }
                }
            `
            })
            .expect(200);
        expect(response.body.data.createCompany.name).toEqual('Test Company');
        const createdCompanyId = response.body.data.createCompany.id;
        // Then, delete the company using the ID
        response = await request(server)
            .post('/')
            .send({
                query: `
                mutation {
                    deleteCompany(id: ${createdCompanyId}) {
                        id,
                        name
                    }
                }
            `
            })
            .expect(200);

        expect(response.body.data.deleteCompany.id).toEqual(createdCompanyId);
        expect(response.body.data.deleteCompany.name).toEqual('Test Company');
    });

    it('should extend a policy', async () => {
        const response = await request(server)
            .post('/')
            .send({
                query: `
                mutation  {
                    extendPolicy(endDate: "2025-01-01", id: 2) {
                      id,
                      endDate,
                      number,
                    }
                  }
                  
            `
            })
            .expect(200);
        console.log(response.body.data);
        expect(response.body.data.extendPolicy.endDate).toEqual('2025-01-01T00:00:00.000Z');
        const response_update = await request(server)
            .post('/')
            .send({
                query: `
                mutation {
                    extendPolicy(id: 1, endDate: "2023-12-31") {
                        endDate
                    }
                }
            `
            })
            .expect(200);
        expect(response_update.body.data.extendPolicy.endDate).toEqual('2023-12-31T00:00:00.000Z');


    });
    
});

afterAll(done => {
    server.close(done);
});