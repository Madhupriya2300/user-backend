const jwt = require('jsonwebtoken');

const Authorization = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.send({ statusCode: 400, message: "Authorization Failed" });
    } else {
        //Bearer jgjsdsd.....
        const tokenBody = token?.slice(7);
        jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.send({ statusCode: 400, message: "Authorization Failed" });
            } else {
                if (decoded.exp < Date.now() / 1000) {
                    return res.send({ statusCode: 400, message: "Authorization Failed" });
                } else {
                    next();
                }
            }
        });
    }
};

module.exports = {
    Authorization
};