const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);