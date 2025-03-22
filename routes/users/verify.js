import jwt from "jsonwebtoken"
export const verifyToken= async(req, res, next)=>{
try{
const {token}= req.headers
const   user= jwt.verify(token,process.env.jwt_secret,(err, data)=>{
if(err){
    return res.status(500).json({success:false, result:err.message})
}
req.user=data
next()

})
 
}
catch(err){
return res.status(500).json({success:false, result:err.message})
}
}



export const verifyAdmin= async(req, res, next)=>{
    try{
    const {token}= req.headers
    const   user= jwt.verify(token,process.env.jwt_secret,(err, data)=>{
    if(err){
        return res.status(500).json({success:false, result:err.message})
    }
    if(data.userType!=="admin"){
         return res.status(403).json({success:false, result:"ONly admins can continue"})
    }
    req.user=data
    next()
    
    })
     
    }
    catch(err){
return res.status(500).json({success:false, result:err.message})
        
    }
    }


    export const verifyCreator= async(req, res, next)=>{
        try{
        const {token}= req.headers
        const   user= jwt.verify(token,process.env.jwt_secret,(err, data)=>{
        if(err){
            return res.status(500).json({success:false, result:err.message})
        }
        if((data.userType!=="admin")&& (data.userType!=="creator")){
             return res.status(403).json({success:false, result:"ONly admins can continue"})
        }
        req.user=data
        next()
        
        })
         
        }
        catch(err){
    return res.status(500).json({success:false, result:err.message})
            
        }
        }