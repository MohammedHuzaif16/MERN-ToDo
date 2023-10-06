import express from 'express';
import mongoose from 'mongoose';
import { PORT,mongoURI } from './config.js';
const app=express()
import cors from 'cors';
import taskRoute from './routes/taskRoute.js'
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.status(200).send('welcome to ToDo Homepage')
})

app.use('/task',taskRoute)

mongoose.connect(mongoURI).then(()=>{
    console.log('connected to MongoDb')
    app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
    })
})