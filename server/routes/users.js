const express = require('express');
const User = require('../model/User');
const router = express.Router();



router.get('/', async (req,res)=>{
    const users = await User.find();
    res.json(users);
});


router.get('byId/:id', async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
});

router.get('/challengeId/:challenge', async (req,res)=>{
    const challenge = req.params.challenge;
    const users = await User.find({challenges:challenge});
    res.json(users);
});

module.exports = router;



