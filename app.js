
const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const dotenv = require("dotenv")
const dbConnect = require("./controller/dbController")
const phraseRoutes = require("./phrase.routes")
dotenv.config()

const port = process.env.PORT

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
})

// middleware
app.use(express.json())
app.use(cors())

// socket
app.use((req, res, next) => {
    req.io = io
    next()
})

// routes
app.use(phraseRoutes)

app.get("/", (req, res) =>{
    res.send("hello dear")
})

app.use((req, res) => {
    res.status(404).json({error: "route not found"})
    console.error("route not found")
})
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(port, async()=>{
    await dbConnect()
    console.log(`app listening on port ${port}`)
})