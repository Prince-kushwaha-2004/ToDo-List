const passport=require('passport')
const Todo=require('./models/todo')
module.exports.authenticateforlogin=(req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({ message: info.message || 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.user=user;
            next()
        });
    })(req,res,next)
}

module.exports.isLogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status(401).send({"message":"user not login"})
    }
    next();
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