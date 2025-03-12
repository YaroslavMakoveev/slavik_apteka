require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (role) {
    return function (req, res, next) {
        try {
            if(req.method === 'OPTIONS') {
                next()
            }
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role) {
                return res.status(402).json({message: 'Не доастаточно прав'})
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message: 'Не авторизован'})
        }
    }
}