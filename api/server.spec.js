const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig')


describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test register', function() {
        return request(server).post('/api/auth/register').send(
        {username: 'test', password: 'password'}
        )
            .then(res => {
                console.log('status', res.status)
                expect(res.status).toBe(201)
            })
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