const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, please login first' });
    }
    jwt.verify(token, process.env.Access_Token_Secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden, invalid token' });
        }   
        req.manager = decoded;
        next();
    });
};

module.exports = verifyJWT;