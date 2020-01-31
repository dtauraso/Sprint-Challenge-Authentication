const request = require('supertest')
const server = require('./server.js')


describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    describe('GET /', function() {
        it('should return 200 OK', function() { // returns no value
            // make a GET request to /
            return request(server).get('/') // returns a promise
                .then(res => {
                    expect(res.status).toBe(200)
                })
            // check that that status code is 200
        })
        it('should return 200 OK', function() { // returns no value
            // make a GET request to /
            return request(server).get('/') // returns a promise
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
            // check that that status code is 200
        })

        it('should return 200 OK', function() { // returns no value
            // make a GET request to /
            return request(server).get('/') // returns a promise
                .then(res => {
                    expect(res.body).toStrictEqual({api: 'up'})
                })
            // check that that status code is 200
        })

        it('should return 200 OK', function() { // returns no value
            // make a GET request to /
            return request(server).get('/hobbits') // returns a promise
                .then(res => {
                    expect(res.status).toBe(200)
                })
            // check that that status code is 200
        })

    })
        
})