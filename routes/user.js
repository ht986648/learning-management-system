const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db'); 
const jwt=require('jsonwebtoken');
const JWT_USER_PASSOWRD="123abc";

// POST route for signing up a user
userRouter.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    // Attempt to create a new user in the database
    const newUser = await userModel.create({
      email,
      password,
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
    res.json({
     token:token
    });
}else{
    res.status(403).json({
        message:"INCORRECT CREDENTIALS"
    })
}

});


userRouter.get('/purchases', (req, res) => {
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
