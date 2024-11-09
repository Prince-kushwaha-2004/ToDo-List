if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}
const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const methodOverride=require("method-override");

const session=require('express-session');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const MongoStore=require('connect-mongo');


const cors = require('cors');
// app.use(cors());
app.use(cors({credentials: true, origin: 'https://todo-list-1-u5l2.onrender.com'}))
// app.use(cors({credentials: true, origin: true}));
const userRouter=require("./routes/user")
const todoRouter=require("./routes/todo")

const User=require('./models/user.js')


app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


// const dbUrl='mongodb://127.0.0.1:27017/todo'
const dbUrl=process.env.ATLAS_URL

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*60*60
}) //to store the session data in the mongoDB

store.on("error",function(e){
    console.log("Session store error",e);
})
const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        secure: true,
        sameSite: 'none'
    }
}
app.use(session(sessionOption));



main() 
    .then(()=>{console.log("Server connected")})
    .catch(err => console.log(err));

async function main() {
await mongoose.connect(dbUrl);
}

//authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get("/",(req,res)=>{
    res.send("welcome to todo website")
})
app.use("/",userRouter)
app.use("/todo",todoRouter)

app.get("/authenticate",(req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).send({"message":"User authenticated","username":req.user.username})
    }else{
        res.status(401).send({"message":"User not authenticated"})
    }
    
})

app.listen("8000",()=>{
    console.log("server listining from port 8000")
})