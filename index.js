import  {config} from  "dotenv"
import express from "express"
import connect_db from "./connect_db.js"
import handleErrors from "./errorhandler.js"
import cors  from "cors"
import userRouter from "./routes/users/route.js"
import  videoRouter from "./routes/videos/route.js"
import  videoModel from "./models/videos.js"
import channelRouter from "./routes/channels/route.js"
import channels from "./models/channels.js"
config()

const  server= express()


// cross platform origins
server.use(cors())
server.use(express.json())

server.get("/", async(req, res)=>{return res.status(200).send("hello")})

// routes  are used below
server.use("/users", userRouter)
server.use("/videos", videoRouter)
server.use("/channels", channelRouter)




server.get("/", (req,res)=>{
    return res.status(200).send("okay")
})

//  handle errors
server.use(handleErrors)
const  startServer=async()=>{
    const port= process.env.PORT||3500
    try{
        await connect_db(process.env.mongo_uri)
        server.listen(process.env.PORT,()=>{
            console.log(` database connected, server is now listening on port: ${port} `)
        })
        // await  videoModel.deleteMany()
}
catch(err){
    console.log(err.message)
}
}
startServer()