const express = require('express');
const {mongoose}=require('mongoose');
const {userRouter } = require('./routes/user');
const {courseRouter}=require('./routes/course');
const {adminRouter} =require('./routes/admin');
const app = express();
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',courseRouter);
app.use('/api/v1/admin',adminRouter);
console.log(" i am using express for openSource pull requests");

async function connect(){
    
   await mongoose.connect("mongodb+srv://himanshutiwari1378:Himanshu2809@cluster0.2bhae.mongodb.net/udemy-app");
   console.log("app is lisening");
   app.listen(3000);
}
 connect();