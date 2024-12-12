const jwt=require('jsonwebtoken')
const User=require('./models/user')
const Todo=require('./models/todo')
module.exports.isLogin=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(400).json({"error":"Please Login"})
    }
    data=jwt.verify(token,process.env.TOKEN_SECRET)
    if(!data){
        return res.status(400).json({"error":"Token expired"})
    }
   
    const user=await User.findOne({_id:data.id})
    req.user=user
    next()
}

module.exports.isowner=async(req,res,next)=>{
    let {id}=req.body
    let todo=await Todo.findById(id)
    if(!(todo)){
        return res.status(400).send({"message":"no todo found"})
    }
    if(!todo.user.equals(req.user._id)){
        return res.status(404).send({"message":"you are not authorised"})
    }
    next()
}