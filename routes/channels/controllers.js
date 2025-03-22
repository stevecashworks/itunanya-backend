import channelModel from "../../models/channels.js";
import createCustomError from "../../createCustomError.js"
import videosModel from "../../models/videos.js";
import { customAlphabet } from "nanoid";
 export const createChannel= async (req, res, next)=>{
    try{
        const dial= customAlphabet("123456789", 3)()
        
         const newChannel= await channelModel.create({...req.body, dial, admin:req.user.id})

         return res.status(200).json({success:true, result:"Channel was created succesfully"})
    }
    catch(err){
        next(createCustomError(err.message))
    }
}

export const viewChannel =  async(req,res,next)=>{
    try {
        const channel=await channelModel.findById(req.body.id);
         if(!channel){
            return res.status(404).json({success:false, result:"Channel was not found"}) 
         }
        return  res.status(200).json({success:true, result: channel}) 
    } catch (error) {
        next(createCustomError(error.message ))
    }
}
export const viewChannelVideos= async(req, res,next)=>{
     try{
        const  {id}= req.params
        const  videos= await   videosModel.find({channels:{
            $in: id
        }})
        return res.status(200).json({success:true, result:videos})
     }
     catch(err){
        next(createCustomError(err.message))
     }
}

export const removeChannel=async(req, res,next)=>{
    try{
             await channelModel.findByIdAndDelete(req.params.id)
             return res.status(200).json({success:true, result:"Channel deleted successfully"})
    }
    catch(err){
        next(createCustomError(err.message))
    }
}

export const  addCreator= async(req, res, next)=>{
    try{
        const channelId= req.params.id
        const userId= req.body.user
        const  updatedChannel= await channelModel.findByIdAndUpdate(
            channelId,
            {$push:{
                creators:userId
            }}

        )
    }
    catch(err){
        next(createCustomError(err.message))
    }
}  


export const  getAllChannels= async(req, res, next)=>{
    try{
        const allChannels= await channelModel.find()
        return res.status(200).json({success:true, result:allChannels})
    }
    catch(err){
        next(createCustomError(err.message))
    }
}