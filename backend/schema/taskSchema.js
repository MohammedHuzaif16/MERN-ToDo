import mongoose from "mongoose";

let taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

let Task=mongoose.model('Task',taskSchema)

export default Task;