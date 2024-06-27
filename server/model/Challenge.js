const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    difficulty:{
        type:Number,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    flag:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Challenge',challengeSchema);