const express = require('express');
const User = require('../model/User');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');






router.get('/',async(req,res)=>{
    const cookies = req.cookies;

    const refreshToken = req.header('refreshToken');

    if(!refreshToken) return res.json('no cookies');

    const user = await User.findOne({refreshToken:refreshToken});

    if (!user) return res.json('no user with this refresh Token');

    const validRefresh = jwt.verify(user.refreshToken,process.env.REFRESH_TOKEN_SECRET);

    try {
        if (validRefresh) {
            const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
            res.json({...validRefresh,accessToken:accessToken});
        }
    } catch (error) {
        res.sendStatus(403);
    }


});



module.exports = router;
