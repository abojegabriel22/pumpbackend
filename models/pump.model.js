
const mongoose = require("mongoose")

const PumpSchema = new mongoose.Schema({
    pumpfunPhrases: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})
const PumpModel = mongoose.model("pumpfunPhrase", PumpSchema)
module.exports = PumpModel