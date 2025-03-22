import {Router} from "express"
import { createVideo, getAllVideos, getByShortcode, getVideo, searchVideos } from "./controllers.js"
import {verifyToken} from "../users/verify.js"
const videoRouter= Router()



videoRouter.post("/create", verifyToken, createVideo)
videoRouter.post("/single/:id", getVideo)
videoRouter.post("/code/:shortCode", getByShortcode)
videoRouter.get("/", getAllVideos)
videoRouter.post("/search", searchVideos)



export default  videoRouter