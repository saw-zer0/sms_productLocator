const mongoose = require('mongoose');

async function assertDatabaseConnection(){
    console.log("Connecting to database");
    try{
        await mongoose.connect("mongodb+srv://sauravshrestha:simple@cluster0.nyrrt14.mongodb.net/?retryWrites=true&w=majority")
        console.log("OK")
    }catch(err){
        console.log(err)
        process.exit();
    }
}

module.exports = {
    assertDatabaseConnection,
}