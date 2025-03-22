import createCustomError from "../../createCustomError.js"
import userModel from "../../models/users.js"
import jwt from  "jsonwebtoken"
export const register= async(req, res, next)=>{
    try {
        console.log(req.body)
        const newUser= await userModel.create(req.body)
         const token=  jwt.sign({id:newUser._id ,userType:newUser.userType},process.env.jwt_secret)

         return res.status(201).json({success:true, result:token})
        
    } catch (error) {

        return res.status(200).json({success:false, result:error.message})
    next(createCustomError(error.message))
    }
}

export const login=async(req, res,next)=>{
    try {
        const {email,password}= req.body

        const  thisUser= await userModel.findOne({email})
        if(!thisUser){
            return res.status(404). json({success:false, result:"No user was found with this email"})
        }
        const userPassword= thisUser.password
        if(password!==userPassword){
            return   res.status(403).json({success:false, result:"Pncorrect password"}) 
        }

        const  token=   await jwt.sign({id: thisUser._id,userType:thisUser.userType}, process.env.jwt_secret)
    return res.status(200).json({success:true, result:token})
        
    } catch (error) {
        next(createCustomError(error.message))
    }
}

export const getAllUsers=async(req,res,next)=>{
    try {
        
        const allUsers=await userModel.find()
        return res.status(200).json({success:true, result:allUsers})
    } catch (error) {
        next(createCustomError(error.message))
    }
}

export const getUser= async(req, res, next)=>{
    try{
        const userId= req.params.id
            const  thisUser= await  userModel.findById(userId)
            return res.status(200).json({success:true, result:thisUser})
    }
    catch(err){
        next(createCustomError(err.message))
    }
}


export const editUser= async(req, res, next)=>{
    try{
             const userId= req.params.id
            const  thisUser= await  userModel.findByIdAndUpdate(userId, {$set:req.body})
            return res.status(200).json({success:true, result:thisUser})
    }
    catch(err){
        next(createCustomError(err.message))
    }
}

export const loginWithtoken=async(req,res,next)=>{
    try {
       const userId=  req.user.id
       const thisUser= await userModel.findById(userId)
       if(!thisUser){
        return res.status(404).json({success:false, result:"User not found"})
       }
       return res.status(200).json({success:true, result:thisUser})
        
    } catch (error) {
        next(createCustomError(error.message))
    }
}