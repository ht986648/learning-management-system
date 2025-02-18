const {Router}=require('express');
const courseRouter=Router();
  
        courseRouter.get('/courses', function (req, res) {
         res.json({
          msg:"the courses are preview"
         })
          
        })

module.exports={
  courseRouter:courseRouter
}