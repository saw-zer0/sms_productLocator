const mongoose = require('mongoose');

async function assertDatabaseConnection(){
    console.log("Connecting to database");
    try{
        await mongoose.connect("mongodb://localhost:27017/ProductLocator")
        console.log("OK")
    }catch(err){
        console.log(err)
        process.exit();
    }
}


module.exports = {
    assertDatabaseConnection,
}