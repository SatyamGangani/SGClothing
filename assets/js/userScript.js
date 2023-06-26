$(document).ready(()=>{
    $('body').hide().fadeIn();
})
function submitForm(event){
    let name=$('#name').val();
    let phoneNumber=$('#phoneNo').val();
    let email=$('#email').val();
    let password=$('#password').val();
    let validRegexName = /^[a-zA-Z]/;
    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validRegexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let validRegexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let flag = true;
    //This PhoneNumberRegex allows:
    //(123) 456-7890
    // (123)456-7890
    // 123-456-7890
    // 123.456.7890
    // 1234567890
    // +31636363634
    // 075-63546725

    // let emailValid = document.getElementById('validEmail');
    if(email.match(validRegexEmail)){
        $('#validEmail').css('display','none');
    }
    else{
        $('#validEmail').css('display','block');
        flag=false;
    }
    if(password.match(validRegexPassword)){
        $('#validPassword').css('display','none');
    }
    else{
        $('#validPassword').css('display','block');
        flag=false;
    }
    if(name.match(validRegexName)){
        $('#validName').css('display','none');
    }
    else{
        $('#validName').css('display','block');
        flag=false;
    }
    if(phoneNumber.match(validRegexPhone)){
    $('#validPhone').css('display','none');
}
    else{
        $('#validPhone').css('display','block');
        flag=false; 
        }
    let signupObj = {email:email,password:password,name:name,phone:phoneNumber};
    if(flag){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify(signupObj);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(signupObj),
        redirect: 'follow'
        };

        fetch("/user/createUser", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            if(result.error){
                $("#emailExistErr").css('display','block'); 
            }else{
                localStorage.setItem('user',result._id);
                localStorage.setItem('userName',result.name);
                location.replace("/")
            }
        })
        .catch(error => console.log('error', error));
    }
    }

function loginUser(){
    let email = $("#email").val();
    let password = $("#password").val();
    if(email && password){
        let header = new Headers();
        header.append("Content-Type", "application/json");
        loginObj =new Object({email,password});
        fetch('/user/loginUser',{
            method:"POST",
            headers:header,
            body:JSON.stringify(loginObj)
        })
        .then(response => response.json())
        .then(result =>{
            if(result.error){
                $("#invalidDiv").css('display','block'); 
                let invalidMsg = document.getElementById('invalidMsg');
                invalidMsg.innerHTML = result.error;
            }
            else{
                localStorage.setItem('user',result._id);
                localStorage.setItem('userName',result.name);
                location.replace("/")
            }
        })
        .catch(error => console.log("error "+error));
    }
    else{
        
        $("#invalidDiv").css('display','block'); 
        let invalidMsg = document.getElementById('invalidMsg');
        invalidMsg.innerHTML = "Please enter email id and password.";
    }
}
  
    function generateOTP() {
            
        // Declare a digits variable 
        // which stores all digits
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

function forgetPassword(){
    let email=$('#email').val();
    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    $('#emailNotExistErr').css('display','none');
    if(email.match(validRegexEmail)){
        $('#validEmail').css('display','none');
        let header = new Headers();
        header.append("Content-Type", "application/json");
        fetch("/user/getOtp",{
            method:"POST",
            headers:header,
            body:JSON.stringify({email})
        })
        .then(response=>response.json())
        .then(result=>{
            if(result.error){
                $('#emailNotExistErr').css('display','block');
            }
            else{
                $('#email').css('display','none');
                $('#forgetPass').css('display','none');
                $('#password').css('display','block');
                $('#otp').css('display','block');
                $('#setPassword').css('display','block');
            }
        })
        .catch(err=>console.log(err))
    }
    else{
        $('#validEmail').css('display','block');
    }
}

function setNewPassword(){
    let otp = $("#otp").val();
    let email= $("#email").val();
    let password= $("#password").val();
    let validRegexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    $('#invalidPassword').css('display','none');
    if(otp.length==6 && password.match(validRegexPassword)){
        $('#enterOtpErr').css('display','none');
        let header = new Headers();
        header.append("Content-Type", "application/json");
        fetch("/user/validateOtp",{
            method:"POST",
            headers:header,
            body:JSON.stringify({email,otp,password})
        })
        .then(response=>response.json())
        .then(result=>{
            if(result.error){
                $('#invalidOtpErr').css('display','block');
                $('#otpErrMsg').text(result.error);
            }else{
                localStorage.setItem('user',result._id);
                localStorage.setItem('userName',result.name);
                location.replace("/")
            }
        })
        .catch(err=>console.log(err))
    }else{
        $('#enterOtpErr').css('display','block');
        if(!password.match(validRegexPassword)){
            $('#invalidPassword').css('display','block');
        }
    }
}

// if(! user){
//     if(window.location.href.includes('/user/dashboard'))
//     window.location.href = `/user/dashboard`;
// }

$( window ).on( "load", function() {
    if(! user){
        if(window.location.href.includes('/user/dashboard') || window.location.href.includes()){
            fetch('/error')
            .then(res=>res.text())
            .then(data=>document.write(data))
        }
    }
  } );

async function updateUserDetail() {
    // Input values.
    let name = $('#name').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
    let userId = $('#userId').val();
    let profilePic = document.getElementById('profilePic');
    
    let validRegexName = /^[a-zA-Z]/;
    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validRegexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let submitFlag = true;
    if(name.match(validRegexName)){
        $('#validName').css('display','none');
    }
    else{
        $('#validName').css('display','block');
        submitFlag=false;
    }
    if(email.match(validRegexEmail)){
        $('#validEmail').css('display','none');
    }
    else{
        $('#validEmail').css('display','block');
        submitFlag=false;
    }
    if(phone.match(validRegexPhone)){
        $('#validPhone').css('display','none');
    }
    else{
        $('#validPhone').css('display','block');
        submitFlag=false; 
    }

    let inValidImage = (img) => {
        try {
            return img.files[0].type.split("/")[0] == 'image' ? false : true
        }
        catch {
            return true
        }
    }
    if (inValidImage(profilePic) &&  profilePic.value!='') {
        $('#invalidProfilePic').css('display', 'block');
        submitFlag = false
    }
    // else if  (editProduct && && inValidImage(primaryImg)){
    //     $('#invalidPrimaryImg').css('display', 'block');
    //     submitFlag = false
    // }
    else {
        $('#invalidProfilePic').css('display', 'none');
    }
    if (submitFlag) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('id', userId);
        formData.append('email', email);
        formData.append('profilePic', profilePic.files[0]);
        let options = {
            method:'PUT',
            body: formData
        }
        let url = `/user/updateUser`;
        let fetchRes = fetch(url,options);
        fetchRes.then(res =>
            res.json()).then(data => {
                if(data.success){
                    window.location.href=`/user/dashboard?id=${userId}`
                }
                else{
                    if(data.error){
                        $('#errorMsg').show();
                        let errorMsg = document.getElementById('errorMsg');
                        errorMsg.innerHTML = `<i class="tf-ion-alert-circled"></i><span>${data.error}</span>`
                    }
                }
            })
    }
}
