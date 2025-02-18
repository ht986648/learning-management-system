const {Schema, default: mongoose, mongo}=require('mongoose');
console.log("connecting to mongoose");

const ObjectId=mongoose.Types.ObjectId;

const userSchema= new Schema({
email:{type: String,unique:true},
password:{type:String},
firstName:{type:String},
lastName:{type:String}
});
const adminSchema=  new Schema({
email:{type:String,unique:true},
password:{type:String},
firstName:{type:String},
lastName:{type:String}

});
const courseSchema= new Schema({
title:String,
description:String,
price:Number,
imageUrl:String,
createrId:ObjectId,
});
const purchaseSchema=  new Schema({
userId:ObjectId,
courseId:ObjectId
});

const userModel=mongoose.model('user',userSchema);
const adminModel =mongoose.model('admin',adminSchema);
const courseModel =mongoose.model('course',courseSchema);
const purchaseModel =mongoose.model('purchase',purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}

