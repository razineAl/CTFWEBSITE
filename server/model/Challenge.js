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
        default:"Web Exploitation",
        required:true
    },
    difficulty:{
        type:Number,
        required:true,
        default:1,
        min:1,
        max:5
    },
    points:{
        type:Number,
        required:true,
        min:0,
        default:10
    },
    url:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    }
    ,
    flag:{
        type:String,
        required:true
    },
    solves:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    }
});

module.exports = mongoose.model('Challenge',challengeSchema);