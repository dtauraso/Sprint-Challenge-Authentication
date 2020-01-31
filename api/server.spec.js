const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig')

// makes sure these endpoints actually exist
describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test register endpoint', function() {
        return request(server)
                .post('/api/auth/register')
                .send({
                        username: 'test',
                        password: 'password'})
                .then(res => {
                    // console.log('status', res.status)
                    expect(res.status).toBe(201)
            })
    })
    it('test register model', async function() {

        await db('users')
            .insert({
                username: 'test',
                password: 'password'})
        const users = await db('users')

        expect(users).toHaveLength(1)
    })
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test register and login endpoint', function() {
        return request(server)
                .post('/api/auth/register')
                .send({
                        username: 'test',
                        password: 'password'})
                .then(res => {
                    // console.log('status', res.status)
                    if(res.status === 201) {
                        return request(server)
                            .post('/api/auth/login')
                            .send({
                                username: 'test',
                                password: 'password'})
                            .then(res => {
                                expect(res.status).toBe(200)
                            })
                    }
                    expect(res.status).toBe(201)
            })
    })
    it('test register and login model', async function() {
        await db('users')
            .insert({
                username: 'test',
                password: 'password'})
        const users = await db('users')
        if(users.length === 1) {
            const users = await db('users')
                        .where('id', 1)
            expect(users).toHaveLength(1)
            
        }
        // expect(users).toHaveLength(1)
    })

        // it('should return 200 OK', function() { // returns no value
        //     // make a GET request to /
        //     return request(server).get('/') // returns a promise
        //         .then(res => {
        //             expect(res.type).toMatch(/json/i)
        //         })
        //     // check that that status code is 200
        // })

        // it('should return 200 OK', function() { // returns no value
        //     // make a GET request to /
        //     return request(server).get('/') // returns a promise
        //         .then(res => {
        //             expect(res.body).toStrictEqual({api: 'up'})
        //         })
        //     // check that that status code is 200
        // })

        // it('should return 200 OK', function() { // returns no value
        //     // make a GET request to /
        //     return request(server).get('/hobbits') // returns a promise
        //         .then(res => {
        //             expect(res.status).toBe(200)
        //         })
        //     // check that that status code is 200
        // })

        
})

// describe('something', function() {
//     it('GET / should return 200 OK', function() { // returns no value
//         // make a GET request to /
//         return request(server).get('/api/auth/') // returns a promise
//             .then(res => {
//                 // console.log(res.status)
//                 expect(res.status).toBe(200)
//             })
//         // check that that status code is 200
//     })
// })