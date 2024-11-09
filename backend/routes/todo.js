const express=require('express')
const Router=express.Router()
const {addtodo,gettodo,updatetodo,markDone,deletetodo}=require('../controllers/todo')
const wrapAsync=require('../utils/wramAsync')
const {isLogin,isowner}=require('../middleware')

Router.post("/addtodo",isLogin,wrapAsync(addtodo))
Router.get("/",isLogin,wrapAsync(gettodo))
Router.put("/update",isLogin,isowner,wrapAsync(updatetodo))
Router.patch('/markDone',isLogin,isowner,wrapAsync(markDone))
Router.post('/delete',isLogin,isowner,wrapAsync(deletetodo))
module.exports=Router
