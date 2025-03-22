const handleErrors=async(err,req,res,next)=>{
    console.log(err)
    return res.status(500).json({success:false, result:err.message})
}

export default handleErrors