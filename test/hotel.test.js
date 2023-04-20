const request = require('supertest')
const {app} = require('../src/index')

var token;
describe("Test for hotels API", () => {

    beforeAll(async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({
            // "name": "Donib",
            "email": "a21112321@abc1.com",
            "password": "hacker"
        });
        token = response.body.token;
    }, 600000);

    it("Test for hotel registration for authenticated users", async () => {
        const response = await request(app)
        .post('/api/hotels/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "name": "City Hote",
            "address": "Pokhara",
            "contactNumber": "9876543210"
        });

        expect(response.body.message).toBe("Hotel registered successfully!")
        expect(response.statusCode).toBe(201);
    }, 600000)

    it.only("test for 401 error for unauthenticated user", async () => {
        const res = await request(app)
        .post('/api/hotels/register')
        .send({
            "name": "CityHotel",
            "address": "Pokhara",
            "contactNumber": "9876543210"
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe("User not authorized")
    },600000)

    it("Test for view hotel", async () => {
        const res = await request(app)
        .get('/api/hotels/viewHotel');

        expect(res.statusCode).toEqual(200)
    },600000)
})
