const {Router} =require('express');
const adminRouter=Router();
const adminModel=require('../db');
const jwt=require('jsonwebtoken');
const JWT_USER_PASSOWRD="123abc";
adminRouter.post('/signup', async (req,res)=>{
    const {email,password,firstname,lastname}=req.body;
   await adminModel.create({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname

    })
   res.json({
    msg:"signup suceed"
   })
})
adminRouter.post('/signin', async(req,res)=>{
    const {email,password}=req.body;
    const admin= await userModel.find({
     email:email,
     password:password
    })
 if(admin){
   const token=  jwt.sign({
         id:admin._id,
 
     },JWT_USER_PASSOWRD);
     res.json({
      token:token
     });
 }else{
     res.status(403).json({
         message:"INCORRECT CREDENTIALS"
     })
 }
})
adminRouter.post('/course',(req,res)=>{

})
adminRouter.put('/course',(req,res)=>{

})

adminRouter.get('/course/bulk',(req,res)=>{
    res.json({
        message:"the courses are put by admin in bulk"
    })
})

module.exports={
    adminRouter:adminRouter
}