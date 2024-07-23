const express = require('express');
const User = require('../model/User');
const router = express.Router();
const jwt = require('jsonwebtoken');






router.get('/',async(req,res)=>{

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json('no cookies !');
    


    const refreshToken = cookies.jwt;

    const user = await User.findOne({refreshToken:refreshToken});

    if (!user) return res.status(403).json('no user with this refresh Token');

    const validRefresh = jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET);

    try {
        if (validRefresh) {
            const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
            res.json({username:user.username,id:user._id,accessToken:accessToken,role:user.role});
        }
    } catch (error) {
        res.sendStatus(403);
    }


});



module.exports = router;
