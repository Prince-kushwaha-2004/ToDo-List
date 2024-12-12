const jwt = require('jsonwebtoken');
generateToken=(id,res)=>{
    const token = jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: '15d' 
    });
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "NONE", // to prevent csrf attack .!
        secure:true
      });
}

module.exports=generateToken