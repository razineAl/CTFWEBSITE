const express = require('express');
const router = express.Router();
const Challenge = require('../model/Challenge');

const validateToken = require('../middlewares/authMiddleware');
const {validateRole} = require('../middlewares/roleMiddleware');

router.post('/createChallenge',validateToken,validateRole('admin'),async (req,res)=>{ 
    const challenge = await Challenge.create(req.body);
    res.json('success');
});
router.put('/updateChallenge',validateToken,validateRole('admin'),async (req,res)=>{ 
    const challenge = await Challenge.create(req.body);
    res.json('success');
});


module.exports = router;