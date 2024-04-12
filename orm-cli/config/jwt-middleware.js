const JwtConfig =  require('./jwt-config');
const JWT = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    try {
        const userToken = req.headers['authorization'];
        const decode = await new Promise((resolve, reject) => {
            JWT.verify(userToken, JwtConfig.secret, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    validateToken
}