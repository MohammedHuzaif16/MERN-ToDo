import express from 'express';
import Task from '../schema/taskSchema.js';
const router=express.Router();


// TO ADD TASK TO DB
router.post('/',async(req,res)=>{
    try{
        if(!req.body.task){
            return res.status(400).send({message:'Enter Task!!'})
        }
        const task={task:req.body.task}
        const taskAdd=await Task.create(task)
        return res.status(200).send(taskAdd)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

// TO READ TASK FROM DB
router.get('/',async(req,res)=>{
    try{
        const tasks=await Task.find({})
        return res.status(200).send(tasks)
    }
    catch(err){
        console.log(err.message)
        return res.status(200).send({message:res.message})
    }
})

// TO READ TASK FROM DB BASED ON ID
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const getTask=await Task.findById(id);
    return res.status(200).send(getTask);
})


// TO UPDATE TASK BASED ON ID
router.put('/:id', async(req,res)=>{
    try{
        if(!req.body.task){
            return res.status(400).send({message:'Task value necessary for Update!!'})
        }
        const id=req.params.id;
        const newTask=await Task.findByIdAndUpdate(id,req.body);
        if(!newTask){
            return res.status(400).send({message:'Task not found!'})
        }
        return res.status(200).send({message:'task updated successfully'})
        
    }
    catch(err){
        console.log(err.message)
        return res.status(500).send({message:err.message})
    }
})


// TO DELETE TASK BASED ON ID
router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const getTask=await Task.findByIdAndDelete(id);
        if(!getTask){
            return res.status(404).send({message: 'Task not found'})
        }
        return res.status(200).send({message:'Task deleted successfully'})
    }
    catch(err){
        console.log(err.message)
        return res.status(500).send({message:err.message})
    }    

})

export default router;