const {userModel} = require("../models/user");
const {otpModel} = require("../models/otp");
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name : 'diorfadks',
    api_key : '676245669722669',
    api_secret : 'cyuBEEuA5L1CI6YfEpflZNjzc04'
})

const createNewUser = async (req,res) => {
    let data = req.body;
    let email = await userModel.findOne({email:data.email});
    if(email){
        return res.json({'error' : "email already registered"});
    }
    else{
        let user = await userModel.create({
            name : data.name,
            email : data.email,
            password : data.password,
            phone : data.phone,
        })
        return res.json(user);
    }
}

const loginUser = async (req,res) =>{
    let data = req.body;
    let email = await userModel.findOne({email:data.email});
    if(email){
        if(data.password==email.password){
            console.log(`USER LOGGED IN : ${email.name}`);
            return res.json(email);
        }
        else{
            return res.json({error:"Incorrect password. Please re-enter your password."})
        }
    }
    return res.json({error:"Entered email id is not registered with us."});
}

function generateOTP(email) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
        

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pythonchampion187@gmail.com',
            pass: 'jrlaaahbqjvdfjgk'
        }
        });

        var mailOptions = {
        from: 'pythonchampion187@gmail.com',
        to: email,
        subject: 'OTP for changing password',
        html: `
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Simple Transactional Email</title>
            <style>
              /* -------------------------------------
                  GLOBAL RESETS
              ------------------------------------- */
              img {
                border: none;
                -ms-interpolation-mode: bicubic;
                max-width: 100%; }
              body {
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0; 
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%; }
              table {
                border-collapse: separate;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                width: 100%; }
                table td {
                  font-family: sans-serif;
                  font-size: 14px;
                  vertical-align: top; }
              /* -------------------------------------
                  BODY & CONTAINER
              ------------------------------------- */
              .body {
                background-color: #c0fff8;
                width: 100%; }
              /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
              .container {
                display: block;
                Margin: 0 auto !important;
                /* makes it centered */
                max-width: 580px;
                padding: 10px;
                width: 580px; }
              /* This should also be a block element, so that it will fill 100% of the .container */
              .content {
                box-sizing: border-box;
                display: block;
                Margin: 0 auto;
                max-width: 580px;
                padding: 10px; }
              /* -------------------------------------
                  HEADER, FOOTER, MAIN
              ------------------------------------- */
              .main {
                background: #fff;
                border-radius: 3px;
                width: 100%; }
              .wrapper {
                box-sizing: border-box;
                padding: 20px; }
              .footer {
                clear: both;
                padding-top: 10px;
                text-align: center;
                width: 100%; }
                .footer td,
                .footer p,
                .footer span,
                .footer a {
                  color: #999999;
                  font-size: 12px;
                  text-align: center; }
              /* -------------------------------------
                  TYPOGRAPHY
              ------------------------------------- */
              h1,
              h2,
              h3,
              h4 {
                color: #000000;
                font-family: sans-serif;
                font-weight: 400;
                line-height: 1.4;
                margin: 0;
                Margin-bottom: 30px; }
              h1 {
                font-size: 35px;
                font-weight: 300;
                text-align: center;
                text-transform: capitalize; }
              p,
              ul,
              ol {
                font-family: sans-serif;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                Margin-bottom: 15px; }
                p li,
                ul li,
                ol li {
                  list-style-position: inside;
                  margin-left: 5px; }
              a {
                color: #3498db;
                text-decoration: underline; }
              /* -------------------------------------
                  OTHER STYLES THAT MIGHT BE USEFUL
              ------------------------------------- */
              .last {
                margin-bottom: 0; }
              .first {
                margin-top: 0; }
              .align-center {
                text-align: center; }
              .align-right {
                text-align: right; }
              .align-left {
                text-align: left; }
              .clear {
                clear: both; }
              .mt0 {
                margin-top: 0; }
              .mb0 {
                margin-bottom: 0; }
              .preheader {
                color: transparent;
                display: none;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                mso-hide: all;
                visibility: hidden;
                width: 0; }
              .powered-by a {
                text-decoration: none; }
              hr {
                border: 0;
                border-bottom: 1px solid #f6f6f6;
                Margin: 20px 0; }
              /* -------------------------------------
                  RESPONSIVE AND MOBILE FRIENDLY STYLES
              ------------------------------------- */
              @media only screen and (max-width: 620px) {
                table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important; }
                table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                  font-size: 16px !important; }
                table[class=body] .wrapper,
                table[class=body] .article {
                  padding: 10px !important; }
                table[class=body] .content {
                  padding: 0 !important; }
                table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important; }
                table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important; }
                table[class=body] .btn table {
                  width: 100% !important; }
                table[class=body] .btn a {
                  width: 100% !important; }
                table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important; }}
              @media all {
                .ExternalClass {
                  width: 100%; }
                .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                  line-height: 100%; }
                .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important; } 
                .btn-primary table td:hover {
                  background-color: #34495e !important; }
                .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important; } }
            </style>
          </head>
          <body class="">
            <table border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
                    <span class="preheader">Subscribe to Coloured.com.ng mailing list</span>
                    <table class="main">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <h2>Please you the below code to reset password.</h2>
                                <h1>${OTP}</h1>
                                <p>This email is sent against your request for changing password.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Powered by SG Ecommerce</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    return OTP;
}

const getOtp = async (req,res)=>{
    let data = req.body;
    let email = await userModel.findOne({email:data.email});
    if(email){
        let deleteOtp = await otpModel.deleteMany({email:data.email});
        let otp = await otpModel.create({
            otp:generateOTP(data.email),
            email:data.email,
        })
        console.log(otp);
        res.json({success:'True'});
    }else{
        res.json({error:true})
    }
}

const validateOtp = async  (req,res) => {
    let data = req.body;
    if (data.email){
        let otpRec = await otpModel.findOne({email:data.email});
        if(otpRec){
            if(data.otp==otpRec.otp){
                let passwordChange = await userModel.updateOne({email:data.email},{$set : {password:data.password}});
                let user = await userModel.findOne({email:data.email});
                return res.json(user);
            }
            else{
                return res.json({error:"Please check your otp.It is incorrect."})
            }
        }
        else{
            return res.json({error:"Your OTP is expired. Refresh this page to make new request."})
        }
    }
    return res.json({error:'Invalid request'});
}

const isAdmin = async (req,res)=>{
  let data = req.query;
  let user = await userModel.findOne({_id:data.id});
  if(user.is_admin){
    return res.json({'admin':true})
  }
  return res.json({'admin':false})
}

const userProfile = async (req,res)=>{
  let data = req.query;
  try {
    let user = await userModel.findOne({_id:data.id});
    if(user){
      console.log(`GET /user/dashboard ${user.name}`);
      return res.render('userProfile',{user});
    }
    return res.render('error404');
  } catch (error) {
    return res.render('error404')
  }
}


let ImgDirPath = path.join(__dirname,'../userProfile/');
let tempDirPath = path.join(__dirname,'../temp/');
console.log(ImgDirPath);
console.log(tempDirPath);
const updateUser = async (req,res)=>{
  let data = req.body;
  try {
    let user = await userModel.findOne({_id:data.id});
    if(user){
      if(user.email != data.email){
        let emailUser = await userModel.findOne({_id:data.id});
        if(emailUser){
          return res.json({'error':'Email already exist. Please try other email.'});
        }
        else{
          let updateUser = await userModel.updateOne({_id:data.id},{
            $set : {
              name : data.name,
              email : data.email,
              phone : data.phone
            }
          })
          console.log('updating');
          return res.json({'success':true})
        }
      }
      else{
        let profilePic = req.files.profilePic;
        if(profilePic != undefined){
          if(user.profilePicPublicId){
            let deleteImageURL = await cloudinary.uploader.destroy(user.profilePicPublicId);
          }
          
          let image = `/temp/${profilePic[0].filename}`;
          let imgUrl = await cloudinary.uploader.upload(image);
          try {
            fs.unlinkSync(`${tempDirPath}${profilePic[0].filename}`);
          }
          catch(e){
              console.log('Error occurred while deleting img. Error: \n'+e);
          }
          let updateUser = await userModel.updateOne({_id:data.id},{
            $set : {
              name : data.name,
              email : data.email,
              phone : data.phone,
              profilePic : imgUrl.url,
              profilePicPublicId : imgUrl.public_id,
            }
          })
        }
        else{

          let updateUser = await userModel.updateOne({_id:data.id},{
            $set : {
              name : data.name,
              email : data.email,
              phone : data.phone
            }
          })
        }
        console.log(`PUT /updateUser ${user.name}`);
        return res.json({'success':true})
      }
    }
    else{
      return res.json({'error':'Unexpectedly error occurred.'})
    }
  } catch (error) {
    return res.json({'error':'Unexpectedly error occurred.'})
  }
}

module.exports = {createNewUser,loginUser,getOtp,validateOtp,isAdmin,userProfile,updateUser};
