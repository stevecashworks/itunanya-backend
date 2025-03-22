import { Router } from "express";
import { createChannel,viewChannel, viewChannelVideos, removeChannel,addCreator, getAllChannels, } from "./controllers.js";
import { verifyAdmin } from "../users/verify.js";
const channelRouter= Router()

channelRouter.post("/create", verifyAdmin, createChannel)
channelRouter.get("/",  getAllChannels)



export default channelRouter