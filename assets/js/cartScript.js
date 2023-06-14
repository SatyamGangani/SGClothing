function getCartTableValue(){
    let userId = localStorage.getItem('user');
    if(userId){
  
      let header = new Headers();
      header.append('Content-Type','application/json');
      fetch(`/cart/userCart?id=${userId}`,{
        headers:header,
        method:'GET'
      })
      .then(res=>res.json())
      .then(data=>{
        let cartDiv = document.getElementById('cartBody');
        cartDiv.innerHTML=''
        let totalCartValue = 0;
        data.forEach(ele=>{
          totalCartValue += parseInt(ele.quantity) * parseInt(ele.product.price);
          cartDiv.innerHTML+=
        `
        <tr>
            <td style="width: 10%; height:100px;"><img src="../productImg/${ele.product.primaryImage}" width="" style="width: 100%;height:100%;object-fit:contain;" alt=""></td>
            <td>${ele.product.name}</td>
            <td>${ele.size}</td>
            <td>
            <div class="qty-container" id=${JSON.stringify(ele._id)}>
                <button class="qty-btn-minus btn-rounded mr-1" onclick='cartUpdate(${JSON.stringify(ele._id)},0)' type="button"><i class="tf-ion-minus"></i></button>
                <input type="text" name="qty" value="${ele.quantity}" readonly class="input-qty input-rounded"/>
                <button class="qty-btn-plus btn-rounded ml-1" onclick='cartUpdate(${JSON.stringify(ele._id)},1)' type="button"><i class="tf-ion-plus"></i></button>
            </div>
            </td>
            <td>₹ ${ele.product.price}</td>
            <td>₹ ${parseInt(ele.product.price) * parseInt(ele.quantity)}</td>
            <td><button type="button" onclick='deleteCartId(${JSON.stringify(ele._id)})' class="btn btn-default" style="margin-top: 5px;" ><i class="tf-ion-trash-a"></i></button></td>
          </tr>
            `
          })
          cartDiv.innerHTML+=`
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>₹ ${totalCartValue}</td>
            <td><button class="btn btn-main btn-medium btn-round text-center" onclick='checkOut()'>Check Out</button></td>
          </tr>
          `
        })
        .catch(err=>console.log(err))
      }
      else{
        let cartDiv = document.getElementById('cartTableDiv');
        cartDiv.innerHTML='<h2>No user found.</h2>'
      }
    }
getCartTableValue();

function cartUpdate(cartId,action){
  // if 0 it is consider as we want to remove qty
  // and if it's 1 we consider as we want to add qty.
  $('#loaderCart').fadeIn('slow');
  let header = new Headers();
  header.append('Content-Type','application/json');
  fetch('/cart/updateCart',{
    method : "POST",
    headers : header,
    body : JSON.stringify({
      'cartId' : cartId,
      'action' : action == 1 ? 'add' : 'minus'
    }) 
  })
  .then(res=>res.json())
  .then(data=>{
    $('#loaderCart').fadeOut('slow');
    if(data.success){
      getCartTableValue();
      getCartInfo();
    }
    else{
      alert(data.error)
    }
  })
  .catch(err=>console.log(err))
}

function deleteCartId(cartId){
  $('#loaderCart').fadeIn('slow');
  let header = new Headers();
  header.append('Content-Type','application/json');
  fetch('/cart/deleteCart',{
    method : "DELETE",
    headers : header,
    body : JSON.stringify({
      'cartId' : cartId,
    }) 
  })
  .then(res=>res.json())
  .then(data=>{
    $('#loaderCart').fadeOut('slow');
    if(data.success){
      getCartTableValue();
      getCartInfo();
    }
    else{
      alert(data.error)
    }
  })
  .catch(err=>console.log(err))
}

function checkOut(){
  let userId = localStorage.getItem('user');
  if(userId){
    window.location.href=`/checkout?userId=${userId}`
  }
}