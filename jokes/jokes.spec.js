const request = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig')

describe('get jokes', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test get endpoint', function() {
        // return request(server)
        //         .get('/api/jokes/')
        //         .send()
                
        //         .then(res => {
        //             console.log('status', res.status)
        //             expect(res.status).toBe(201)
        //     })
        return request(server)
                .post('/api/auth/register')
                .send({
                        username: 'test',
                        password: 'password'})
                .then(res => {
                    // console.log('status', res)
                    console.log('user is in')
                    // expect(res.status).toBe(201)
                    return request(server)
                        .get('/api/auth/login')
                        .send({
                            username: 'test',
                            password: 'password'})
                        .then(res => {
                            console.log(res.status)
                            expect(res.status).toBe(201)

                        })
                        // /api/jokes/
            })
    })
})