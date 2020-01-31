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
    it('test get endpoint', async function() {
        // const users = await db('users')

        // console.log('length', users.length)

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
                        username: 'test server',
                        password: 'password'})
                .then(res => {
                    if(res.status === 201) {

                        // console.log('status', res)
                        console.log('user is in')
                        // expect(res.status).toBe(201)
                        // the data was erased before this was run
                        return request(server)
                            .post('/api/auth/login')
                            .send({
                                username: 'test server',
                                password: 'password'})
                            .then(res => {
                                console.log(res.status)
                                // now add the jokes
                                expect(res.status).toBe(200)
            
                            })
                            // /api/jokes/
                        }
                } )
        
   
                
    })
})