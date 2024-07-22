const {verify} = require('jsonwebtoken');


const validateToken = async (req,res,next)=>{


    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

        const token = authHeader.split(' ')[1];


        const validToken = verify(token,process.env.ACCESS_TOKEN_SECRET);

        req.user = validToken;
        if (validToken) return next();
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = validateToken;