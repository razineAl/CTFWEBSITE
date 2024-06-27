const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Category',categorySchema);