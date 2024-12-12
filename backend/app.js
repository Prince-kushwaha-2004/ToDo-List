if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}
const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const methodOverride=require("method-override");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
// const cors = require('cors');
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, 'https://todo-list-1-u5l2.onrender.com');
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    res.header(`Access-Control-Allow-Headers`, 'true');

    next();
  };
  app.use(allowCrossDomain)
app.use(cookieParser())

// app.use(cors)
// app.use(cors({credentials: true, origin: 'https://todo-list-1-u5l2.onrender.com'}))
// app.use(cors({credentials: true, origin: 'http://localhost:5501'}));
const userRouter=require("./routes/user")
const todoRouter=require("./routes/todo")

const User=require('./models/user.js')


app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


// const dbUrl='mongodb://127.0.0.1:27017/todo'
const dbUrl=process.env.ATLAS_URL

// const store=MongoStore.create({
//     mongoUrl:dbUrl,
//     crypto:{
//         secret:process.env.SECRET
//     },
//     touchAfter:24*60*60
// }) //to store the session data in the mongoDB

// store.on("error",function(e){
//     console.log("Session store error",e);
// })


main() 
    .then(()=>{console.log("Database connected")})
    .catch(err => console.log(err));
async function main() {
await mongoose.connect(dbUrl);
}
app.get("/",(req,res)=>{
    res.send("welcome to todo website")
})
app.use("/",userRouter)
app.use("/todo",todoRouter)

app.get("/authenticate",async(req,res)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(400).json({"error":"Please Login"})
    }
    data=await jwt.verify(token,process.env.TOKEN_SECRET)
    if(!data){
        return res.status(400).json({"error":"Token expired"})
    }
    const user=await User.findOne({_id:data.id})
    res.status(200).send({"message":"User authenticated","username":user.username})

    
})

app.listen("8000",()=>{
    console.log("server listining from port 8000")
})

