const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    isPremium:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    challenges:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Challenge',
        default:[]
    }],
    refreshToken : {
        type:String,
        default:''
    }
});

module.exports = mongoose.model('User',userSchema);