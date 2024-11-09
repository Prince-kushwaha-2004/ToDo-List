const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const User=require('./user')

const todoSchema=new Schema({
    task:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        required:true,
        default:false,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})
module.exports=mongoose.model('Todo',todoSchema)