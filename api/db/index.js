const mongoose = require('mongoose');

async function assertDatabaseConnection(){
    console.log("Connecting to database");
    try{
        await mongoose.connect("mongodb+srv://smsProduct:smsProduct@cluster0.bafos3m.mongodb.net/?retryWrites=true&w=majority")
        console.log("OK")
    }catch(err){
        console.log(err)
        process.exit();
    }
}

module.exports = {
    assertDatabaseConnection,
}