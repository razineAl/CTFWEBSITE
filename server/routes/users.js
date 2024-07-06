const express = require('express');
const User = require('../model/User');
const validateToken = require('../middlewares/authMiddleware');
const router = express.Router();



router.get('/', async (req,res)=>{
    const users = await User.find();
    res.json(users);
});


router.get('byId/:id',validateToken ,async (req,res)=>{
    const user = await User.findOne({_id:req.params.id});
    res.json(user);
});

router.get('/challengeId/:challenge',validateToken, async (req,res)=>{
    const challenge = req.params.challenge;
    const users = await User.find({challenges:challenge});
    res.json(users);
});
router.get('/top/:number',validateToken,async (req,res)=>{
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        return res.status(400).json("not a number !");
    }
    try {
        const users = await User.find()
        .sort({points:-1})
        .limit(number);
        res.json(users);

    } catch (error) {
        res.status(500).json("some error occured in the backend !");
    }
})

module.exports = router;



