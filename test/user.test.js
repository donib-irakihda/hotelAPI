const request = require('supertest')
const {app} = require('../src/index')

describe("test for user", () => {
    it('register a user', async () => {
        const response = await request(app)
        .post('/api/users/register')
        .send({
            "name": "Donib",
            "email": "a21@abc1.com",
            "password": "hacker"
        });

        console.log("response",response.body)
        expect(response.statusCode).toBe(200);
        
        expect(response.body.message).toBe("User registration success");

        
    }, 600000)

    it("test for user login", async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({
            "email": "abekkf@abc1.com",
            "password": "hackerr"
        });
        console.log("GG", response.body)
        // expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid credentials")
    },600000)
        
})