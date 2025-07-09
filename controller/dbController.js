
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongourl = process.env.MongoUrl
const RETRY_DELAY = 5000; // 5 seconds
const MAX_RETRIES = 5;    // number of allowed retries
let retryCount = 0;

const dbConnect = async () => {
    try{
        await mongoose.connect(mongourl, {useNewUrlParser:true, useUnifiedTopology: true})
        console.info("database connected!")
    }
    catch(err){
        retryCount++
        console.error("error connecting to database:", err.message)
        if(retryCount < MAX_RETRIES){
            console.log(`retrying in ${RETRY_DELAY / 1000} seconds...`)
            setTimeout(dbConnect, RETRY_DELAY)
        }
        else{
            console.error("exiting process. max retry reached!")
            process.exit(1)
        }
    }
}
module.exports = dbConnect