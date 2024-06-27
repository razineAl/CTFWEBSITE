const {verify} = require('jsonwebtoken');


const validateToken = async (req,res,next)=>{

    const accessToken = req.header('accessToken');

    if(!accessToken) return res.status(403).json({error:'user not logged in !'});

    const validToken = verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

    req.user = validToken;

    try {
        if (validToken) return next();
    } catch (error) {
        res.sendStatus(403);
    }
}

module.exports = validateToken;