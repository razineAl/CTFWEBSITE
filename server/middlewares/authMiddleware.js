const {verify} = require('jsonwebtoken');


const validateToken = async (req,res,next)=>{


    try {
        const accessToken = req.header('accessToken');

        if(!accessToken) return res.status(403).json({error:'user not logged in !'});

        const validToken = verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

        req.user = validToken;
        if (validToken) return next();
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = validateToken;