const request = require('supertest')
const {app} = require('../src/index')
// const { MongoClient } = require('mongodb');


describe("test for user", () => {
    it('register a user', async () => {
        const response = await request(app)
        .post('/api/users/register')
        .send({
            "name": "Donib",
            "email": "catt@abc1.com",
            "password": "hacker"
        });

        console.log("response",response.body)
        expect(response.statusCode).toBe(201);
        
        expect(response.body.message).toBe("User registration success");

        
    }, 600000)

    it("test for user login", async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({
            "email": "cow1@abc1.com",
            "password": "hacker"
        });
        console.log("GG", response.body)
        // expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Login success")
    },600000)
        
})

// afterAll(async () => {
//     const client = new MongoClient("mongodb+srv://donib:code@cluster0.ihj6xk2.mongodb.net/?retryWrites=true&w=majority");
//     await client.connect()
//     const db = client.db()
//     const dbs = await db.admin().listDatabases()
//     for (let data of dbs.databases) {
//         if (data.name.toString().includes("production")) {
//             var dbo = client.db(data.name)
//             dbo.dropDatabase()
//         }
//     }
//     // client.close()
// })