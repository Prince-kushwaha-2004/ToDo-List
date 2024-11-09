const user = require("../models/user");
const User=require("../models/user")

module.exports.signup=async(req,res)=>{
    let {username,name,password,confirmPassword}=req.body;
    if(username==undefined||name==undefined||password==undefined||confirmPassword==undefined){
        return res.status(400).send({"message":"Data is unsufficient"})
    }
    console.log(req.body);
    if(password!==confirmPassword){
       return res.status(401).send({"message":"Password does not match"})
    }
    let newUser=new User({username,name});
    User.register(newUser,password,(err,user)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send("user created successfully")
        }
    })
}
module.exports.login=(req,res)=>{
    const user=req.user
    res.status(200).send({message:"user login",
        User:{
            name:user.name,
            username:user.username
        }
    })
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        res.status(200).send({"message":"user logout successfull"})
    })
}