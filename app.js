
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const dbConnect = require("./controller/dbController")
const phraseRoutes = require("./phrase.routes")
dotenv.config()

const port = process.env.PORT

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use(phraseRoutes)

app.get("/", (req, res) =>{
    res.send("hello dear")
})

app.use((req, res) => {
    res.status(404).json({error: "route not found"})
    // console.error("route not found")
})

app.listen(port, async()=>{
    await dbConnect()
    // console.log(`app listening on port ${port}`)
})