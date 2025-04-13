const { Router } = require('express');
const adminRouter = Router();
const {adminModel}=require('../db');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD = require('../config');
const { adminMiddleware } = require('../middlewares/admin');

// Signup Route
adminRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        const hashPassword = async (plainPassword) => {
            const saltRounds = 10;
            const hashed = await bcrypt.hash(plainPassword, saltRounds);
            return hashed;
          }
          const hashedPassword=await hashPassword(password);
        await adminModel.create({
            email,
            password:hashedPassword,
            firstname,
            lastname
        });

        res.json({
            msg: "Signup succeeded"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error during signup",
            error: error.message
        });
    }
});

// Signin Route
adminRouter.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await adminModel.findOne({ email });
      if (!user) {
        return res.status(403).json({ message: "Incorrect email or password" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({ message: "Incorrect email or password" });
      }
  
      const token = jwt.sign({ id: user._id }, JWT_ADMIN_PASSWORD);
  
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({
        msg: "Error during signin",
        error: error.message
      });
    }
  });
  
// Create Course Route (Placeholder)
adminRouter.post('/course', adminMiddleware, async (req, res) => {
    try {
      const adminId = req.userId;
      const { title, description, price, image } = req.body;
  
      const course = await courseModel.create({
        title,
        description,
        price,
        image,
        createrId: adminId
      });
  
      res.json({
        message: "Course created successfully",
        courseId: course._id
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error creating course",
        error: error.message
      });
    }
  });
  

// Update Course Route (Placeholder)
adminRouter.put('/course', (req, res) => {
    try {
        // Add logic here
        res.json({ msg: "Course updated" });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating course",
            error: error.message
        });
    }
});

// Get Bulk Courses Route
adminRouter.get('/course/bulk', (req, res) => {
    try {
        res.json({
            message: "The courses are put by admin in bulk"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching bulk courses",
            error: error.message
        });
    }
});

module.exports = {
    adminRouter
};
