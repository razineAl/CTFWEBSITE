const express = require('express');
const User = require('../model/User');
const router = express.Router();




router.get('/',async (req,res)=>{
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({refreshToken:refreshToken});

    if(!user) {
        res.clearCookie('jwt');
        return res.sendStatus(204);
    }

    //Delete the refresh token in the database : 

    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt');
    return res.sendStatus(204);

})

module.exports = router;