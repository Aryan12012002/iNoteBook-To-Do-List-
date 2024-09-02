const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="AryanisGoodB$oy"
//ROUTE:1 Create a User using: POST "/api/auth/createuser " .No login required
router.post('/createuser',[
    body('name','Enter a name').isLength({ min: 3 }),
    body('email','Enter the mail').isEmail(),
    body('password','Enter pass').isLength({min:2}),
    ],async(req,res)=>{
      //if there are errors return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user exist with the email already
    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      });
      const data = {
         user : {
           id:user.id
         }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      success:true
      res.json({success,authtoken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

//ROUTE:2 Authenticate a user using:POST "/api/auth/login" . No login required
router.post('/login',[
  body('email','Enter the mail').isEmail(),
  body('password','Password cannot be blank').exists(),
  ],async(req,res)=>{
    let success=false;
  //if there are errors return bad req and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try{
    let user =await User.findOne({email});
    if(!user){
      success:false;
     return res.status(400).json({error:"Please Enter Correct Credentials"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success:false;
     return res.status(400).json({success,error:"Please Enter Correct Credentials"});
    }
    const data = {
      user : {
        id:user.id
      }
   }
   const authtoken = jwt.sign(data,JWT_SECRET);
   success=true;
   res.json({success,authtoken})
  }catch(error){
    console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  })

//ROUTE:3 Get login user Details using:POST "/api/auth/getuser" .Login required
router.post('/getuser',fetchuser,async(req,res)=>{
    
try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports=router