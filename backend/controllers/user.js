const bcrypt=require('bcryptjs')
const User=require("../models/user")
const generateToken=require('../utils/generateToken')
module.exports.signup=async(req,res)=>{
    let {username,name,password,confirmPassword}=req.body;
    if(username==undefined||name==undefined||password==undefined||confirmPassword==undefined){
        return res.status(400).send({"message":"Data is unsufficient"})
    }
    console.log(req.body);
    if(password!==confirmPassword){
       return res.status(401).send({"message":"Password does not match"})
    }
    const hashPassword = await bcrypt.hash(password, 10);
    newuser={
        "username":username,
        "name":name,
        "password":hashPassword
    }
    user=new User(newuser)
    await user.save()
    res.status(200).json({"message":"user created successfull"})
}
module.exports.login=async(req,res)=>{
    data=req.body
    console.log(req.body)
    if(!data||!data.username||!data.password){
        return res.status(400).json({"error":"unsufficient data"})
    }
    user=await User.findOne({"username":data.username})
    if(!user){
        return res.status(400).json({"error":"no user with this credentials"})
    }
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if(!comparePassword){
        return res.status(400).json({"error":"wrong password"})
    }
    generateToken(user._id,res)
    res.status(200).json({"message":"user login successfull"})
}
module.exports.logout=(req,res,next)=>{
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: "NONE" });
    // res.cookie("token", "", { maxAge: 0 });
    res.status(200).send({"message":"user logout successfull"})
    
}