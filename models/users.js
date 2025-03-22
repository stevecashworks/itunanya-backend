import {Schema, model} from "mongoose"
export const  VideoTypeArray={
    type:[
        {
            type:Schema.Types.ObjectId,
            ref:"videos"
        }
    ],
    default:[]
}



const userSchema= Schema({
name:{
    type:String,

},
password:{
    type:String,
    required:true
},

likedVideos:VideoTypeArray,
unlikedVideos:VideoTypeArray,
watchLater:VideoTypeArray,
history:VideoTypeArray,

email:{
type:String,
required:true,
unique:true
},
userType:{
    type:String,
    enum:["admin", "creator", "viewer", "network partner"],
    default:"viewer"
},
interests:{
    type:[],
    default:[]
},

totalEarnings:{
    type:Number,
    default:0
},
posts:VideoTypeArray,

}
)
export default model("users", userSchema )