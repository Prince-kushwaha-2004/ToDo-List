const Todo=require('../models/todo')

module.exports.addtodo=async (req,res)=>{
    let {title}=req.body
    if(!title){
        return res.status(400).send({"message":"title not found"})
    }
    let data={
        "task":title,
        "user":req.user._id
    }

    let newtodo=new Todo(data)
    await newtodo.save()
    res.status(200).send({"message":"Task added Successfully"})
}
module.exports.gettodo=async(req,res)=>{
    let todos=await Todo.find({user:req.user._id})
    res.status(200).send(todos)
}
module.exports.updatetodo=async(req,res)=>{
    let {id,task,isDone}=req.body
    if(task==undefined||isDone==undefined){
       return res.status(400).send({"message":"data is unsufficient"})
    }
    let data={
        task,
        isDone
    }
    await Todo.findByIdAndUpdate(id, { ...data });
    res.status(200).send({"message":"task updated"})
}
module.exports.markDone=async(req,res)=>{
    let {id,isDone}=req.body
    if(isDone==undefined){
        return res.status(400).send({"message":"data is unsufficient"})
     }
    await Todo.findByIdAndUpdate(id,{isDone})
    res.status(200).send({"message":"Task Updated"})
}
module.exports.deletetodo=async(req,res)=>{
    let id=req.body.id;
    await Todo.findByIdAndDelete(id)
    res.status(200).send({"message":"todo deleted"})
}