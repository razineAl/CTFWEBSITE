const express = require('express');
const router = express.Router();
const Challenge = require('../model/Challenge');

const validateToken = require('../middlewares/authMiddleware');
const {validateRole} = require('../middlewares/roleMiddleware');

router.post('/createChallenge',validateToken,validateRole('admin'),async (req,res)=>{ //creation d'un nouveau challenge
    const challenge = await Challenge.create(req.body);
    res.json('success');
});
router.put('/updateChallenge',validateToken,validateRole('admin'),async (req,res)=>{ //modification d'un challenge
    const challenge = await Challenge.create(req.body);
    res.json('success');
});


module.exports = router;