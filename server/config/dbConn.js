const mongoose = require('mongoose');

const dbConn = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = dbConn;