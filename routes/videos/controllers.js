import createCustomError from "../../createCustomError.js"
import  videoModel from "../../models/videos.js"
import {nanoid} from "nanoid"
import path from "path"
import multer from "multer"
export const  createVideo=async(req,res,next)=>{
   const videoId= nanoid(7)
   const shortCode=videoId
   const  videoFile= req.files["video"][0]
   const  thumbnailFile= req.files["thumbnail"][0]
   
   try{

            const newVideo= await videoModel.create({...req.body, url:videoFile, thumbnail:thumbnailFile, creator:req.user.id, shortCode})

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


const storage= multer.diskStorage({
   destination:(req,file,cb)=>{
      if(file.fieldname==="video"){
         cb(null, "v001/uploads/videos")
      }
      else if(file.fieldname==="thumbnail"){
         cb(null, "v001/uploads/thumbnails")
      }
   },
filename:(req,file,cb)=>{
   cb(null,Date.now +"-"+file.originalname)
}

})
export const upload= multer({storage})