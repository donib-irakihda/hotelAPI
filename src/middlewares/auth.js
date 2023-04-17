const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.SECRET_JWT

const auth = (req, res, next) => {

    try {
        let token = req.headers.authorization;
        if(token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_JWT)
            req.userId = user.id
        } else {
            return res.status(401).json({message: "User not authorized"})

        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }

}

module.exports = auth;