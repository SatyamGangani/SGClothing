const express = require('express');
const {createNewUser,loginUser,getOtp,validateOtp,isAdmin} = require('../controller/userController')

const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/forgotpassword',(req,res)=>{
    res.render('forgetpassword')
})
router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/isAdmin',isAdmin)

router.post('/createUser',createNewUser);

router.post('/loginUser',loginUser);

router.post('/getOtp',getOtp);

router.post('/validateOtp',validateOtp);

router.post('/sendOtp',(req,res)=>{
    
})

module.exports = router; 
