function placeOrder(){
    let full_name = $('#full_name').val();
    let user_address = $('#user_address').val();
    let user_post_code = $('#user_post_code').val();
    let user_city = $('#user_city').val();
    let user_country = $('#user_country').val();
    let card_number = $('#card_number').val();
    let card_expiry = $('#card_expiry').val();
    let card_cvc = $('#card_cvc').val();
    let sendFlag = true;
    if(full_name.length<5){
        $('#invalidFullName').show()   
        sendFlag = false;
    }
    else{
        $('#invalidFullName').hide()  
    }
    if(user_address.length<10){
        $('#invalidAddress').show()   
        sendFlag = false;
    }
    else{
        $('#invalidAddress').hide()  
    }
    if( user_post_code.length < 6){
        $('#invalidZip').show()   
        sendFlag = false;
    }
    else{
        $('#invalidZip').hide()  
    }
    if(user_city.length<3){
        $('#invalidCity').show()   
        sendFlag = false;
    }
    else{
        $('#invalidCity').hide()  
    }
    if(user_country.length<3){
        $('#invalidCountry').show()   
        sendFlag = false;
    }
    else{
        $('#invalidCountry').hide()  
    }
    if(card_number.length<8){
        $('#invalidCardNumber').show()   
        sendFlag = false;
    }
    else{
        $('#invalidCardNumber').hide()  
    }
    if(card_expiry.length<5){
        $('#invalidCardExpiry').show()   
        sendFlag = false;
    }
    else{
        $('#invalidCardExpiry').hide()  
    }
    if(card_cvc.length<2){
        $('#invalidCardCVV').show()   
        sendFlag = false;
    }
    else{
        $('#invalidCardCVV').hide()  
    }
    if(sendFlag){
        let user = localStorage.getItem('user');
        let orderObj = {
            user,
            full_name,
            user_address,
            user_post_code,
            user_city,
            user_country,
            card_number,
        }
        let header = new Headers();
        header.append('Content-Type','application/json');
        fetch('/checkOut/orderPlace',{
            method : 'POST',
            headers : header,
            body : JSON.stringify(orderObj)            
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                window.location.href = '/checkout/confirmation';
            }
            else{
                let orderErrorMsg = document.getElementById('orderErrorMsg');
                $('#errorDiv').show();
                if(data.error){
                    orderErrorMsg.innerHTML = `Error Occured : ${data.error}`
                }
                else{
                    orderErrorMsg.innerHTML = `Error Occured : Please reload page or contact us.`
                }
            }
        })
        .catch(err=>console.log(err));
    }
}