const express = require('express');
const {createNewUser,loginUser,getOtp,validateOtp,isAdmin,userProfile,updateUser} = require('../controller/userController')
const path = require('path');
const router = express.Router();

const multer = require('multer');

let storage = multer.diskStorage({
    destination  : function(req,file,cb){
        cb(null,'./temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
})
var upload = multer({ storage: storage });

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/forgotpassword',(req,res)=>{
    res.render('forgetpassword')
})
router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/dashboard',userProfile)

router.get('/isAdmin',isAdmin)

router.post('/createUser',createNewUser);

router.post('/loginUser',loginUser);

router.post('/getOtp',getOtp);

router.post('/validateOtp',validateOtp);

router.put('/updateUser',upload.fields([{name:'profilePic',maxCount:1}]),updateUser);

router.post('/sendOtp',(req,res)=>{
    
})

module.exports = router; 
