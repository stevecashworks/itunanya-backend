import {Router} from "express"
import { createVideo,upload, getAllVideos, getByShortcode, getVideo, searchVideos } from "./controllers.js"
import {verifyToken} from "../users/verify.js"
const videoRouter= Router()



videoRouter.post("/create", verifyToken, upload.fields([
    {name:"video", maxCount:1},
    {name:"thumbnail", maxCount:1},
]), createVideo)
videoRouter.post("/single/:id", getVideo)
videoRouter.post("/code/:shortCode", getByShortcode)
videoRouter.get("/", getAllVideos)
videoRouter.post("/search", searchVideos)



export default  videoRouter