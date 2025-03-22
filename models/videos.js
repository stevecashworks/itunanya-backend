import {Schema, model} from "mongoose"


const channelTypeArray= {
    type:[{type:Schema.Types.ObjectId, ref:"channels"}]
}
export const userTypeArray= {
    type:[
        {
            type:Schema.Types.ObjectId,
            ref:"users",
        }
    ],
    default:[]
}
const videoSchema= Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },

    
shortCode:{
    type:String,
    required:true
},
    url:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    thumbnail:{
    type:String,
    required:true,
    },
    spice:userTypeArray,
    love:userTypeArray,
    salt:userTypeArray,
    pepper:userTypeArray,

    uploadDate:{
        type:Date,
        default:Date.now()
    },
    backDate:{
        type:Date
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    views:userTypeArray,
    viewHours:{
        type:Number,
        default:0
    },
    channels:channelTypeArray
    
})
export default  model("videos", videoSchema)