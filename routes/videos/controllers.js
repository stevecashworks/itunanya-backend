import createCustomError from "../../createCustomError.js"
import  videoModel from "../../models/videos.js"
import {nanoid} from "nanoid"

export const  createVideo=async(req,res,next)=>{
   const videoId= nanoid(7)
   const shortCode=videoId
   try{

            const newVideo= await videoModel.create({...req.body, creator:req.user.id, shortCode})

            return res.status(200).json({success:true, result:"Video was uploaded successfully"})
        

     }
     catch(error){
        next(createCustomError(error.message))
     }
}


export const getAllVideos= async(req, res, next)=>{
      try {
         const allVideos= await videoModel.find()

         return res.status(200).json({success:true, result:allVideos})
      } catch (error) {
         next(createCustomError(error.message))
      }
}


export const getVideo= async(req,res,next)=>{
   

   try {
      const {id} = req.params
   const thisVideo= await videoModel.findById(id)

   return res.status(200).json({success:true, result: thisVideo})

   } catch (error) {
         next(createCustomError(error.message))      
   }
}

export const getByShortcode= async(req,res,next)=>{
   try {
      const  {shortCode}= req.params
      const thisVideo= await videoModel.findOne({shortCode})
      return res.status(200).json({success:true, result:thisVideo})
   } catch (error) {
    next(createCustomError(err.message))  
   }
}
export const searchVideos= async(req, res, next)=>{
   try{
      const {query}=req.body 
      console.log(req.body) 
      console.log("hello")
      const searchRegex = new RegExp(query, "i")
      console.log(searchRegex)
      const foundVideos= await videoModel.find({
         $or:[
            {title:searchRegex},
            {description:searchRegex},
            {tag:searchRegex},
         ]
      })
        return res.status(200).json({success:true, result:foundVideos})
   }
   catch(err){
      next(createCustomError(err.message))
   }
}

