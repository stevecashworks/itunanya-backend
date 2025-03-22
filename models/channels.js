import {model, Schema} from "mongoose"
import { VideoTypeArray } from "./users.js"
import { userTypeArray } from "./videos.js"

const  channelModel=Schema(
    {
        name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    videos:VideoTypeArray,
    admin:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    earnings:{
        type:Number,
        default:0
    },
    dial:{
        type:String,
        required:true
    },
    creators:userTypeArray,
    tags:[String]
    

}
)
export default  model("channels", channelModel)