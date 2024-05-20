const { verifyToken } = require('../utils/jwt');
const { getAsync } = require('../config/redis');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = verifyToken(token);
        const user = await getAsync(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;