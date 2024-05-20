const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config");

const generateToken = (payload) => {
    return jwt.sign({ id: user._id, type: user.type }, jwt_secret, { expiresIn: "1d",
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwt_secret);
};

module.exports = { generateToken, verifyToken };