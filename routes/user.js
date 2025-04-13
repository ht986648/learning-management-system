const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db'); 
const jwt=require('jsonwebtoken');
const JWT_USER_PASSOWRD=require('../config');
const bcrypt = require('bcrypt');
// POST route for signing up a user
userRouter.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
    
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  return hashed;
}
     const hashedPassword=await hashPassword(password);
  try {
    // Attempt to create a new user in the database
    const newUser = await userModel.create({
      email,
     password: hashedPassword,
      firstname,
      lastname
    });

    res.status(201).json({
      message: 'User signed up successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({
      message: 'Error signing up user',
      error: error.message || 'Internal server error'
    });
  }
});

// POST route for signing in a user (for now, just sends a response)
userRouter.post('/signin', async(req, res) => {
    const {email,password}=req.body;
   const user= await userModel.find({
    email:email,
    password:password
   })
if(user){
  const token=  jwt.sign({
        id:user._id,

       

    },JWT_USER_PASSOWRD);
// // do the cookie logic 
const cookie= res.cookie('authToken', token, {
  httpOnly: true,       // Prevents JS access (secure)
  secure: true,         // Use true if you're using HTTPS
  sameSite: 'Strict',   // Adjust depending on frontend/backend domain setup
  maxAge: 60 * 60 * 1000 // 1 hour
});

res.json({
  token: token,
 
  
});

}else{
    res.status(403).json({
        message:"INCORRECT CREDENTIALS"
    })
}

});


userRouter.get('/purchases', (req, res) => {
    res.cookie('authToken','hello world');
  res.json({
    message: 'User past purchased courses'
  });
});


userRouter.post('/purchase', (req, res) => {
  res.json({
    message: 'User wants to purchase a new course'
  });
});

module.exports = {
  userRouter
};
