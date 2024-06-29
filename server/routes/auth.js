const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/register',async (req,res)=>{
    const {username,password} = req.body;

    const foundUsername = await User.findOne({username:username});

    if (foundUsername) return res.json({error:'username already taken'});

    const hashedpwd = await bcrypt.hash(password,10);

    const user = await User.create({username:username,password:hashedpwd,points:0,isPremium:false,role:'user'});

    res.json('success');

});

router.post('/login',async (req,res)=>{

    const {username,password} = req.body;

    const user = await User.findOne({username:username});

    if (!user) return res.status(404).json({error:'there is no user with this username !'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(403).json({error:'invalid username or password '});

    
    const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
    const refreshToken = jwt.sign({username:user.username,id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

    user.refreshToken = refreshToken;
    await user.save();

    
    res.cookie('refresh',refreshToken,{maxAge:1000*3600*24});

    res.json({refreshToken:refreshToken,accessToken:accessToken,username:user.username,id:user._id,role:user.role});


});

module.exports = router;