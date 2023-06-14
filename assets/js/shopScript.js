function openModalProduct(ele){
    let header = new Headers();
    header.append('Content-Type','application/json');
    $('#loaderCart').fadeIn('slow');
    fetch(`/product/getProduct?productId=${ele.id}`,{
        headers:header,
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        $('#loaderCart').fadeOut('slow');
        $('#modalImgShop').attr('src',`../productImg/${data.primaryImage}`);
        $('#modalTitleShop').text(data.name);
        $('#modalPriceShop').text(`Rs. ${data.price}`);
        $('#modalDescShop').text(data.description);
        $('#viewProductLink').attr('href',`/shop/preview?id=${data._id}`);
        $('#viewProductCart').attr('href',`/shop/preview?id=${data._id}`);
    })
}

function categoryChange(ele){
    $(`.category_data`).removeClass('text-danger');
    $(`#${ele.id}`).addClass('text-danger');
    $('#loaderCart').fadeIn('slow');
    let header = new Headers();
    header.append('Content-Type','application/json');
    fetch(`/shop/productCateg?categoryId=${ele.id}`,{
        headers:header,
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        let productRow = document.getElementById('productRow');
        productRow.innerHTML='';
        $('#loaderCart').fadeOut('slow');
        if(data.length){
        data.forEach(element => {
        
            productRow.innerHTML += `
            <div class="col-md-4">
                <div class="product-item">
                    <div class="product-thumb">
                        <span class="bage">Sale</span>
                        <img class="img-responsive" src="../productImg/${element.primaryImage}" style="width: 300px;height: 300px; object-fit: contain;" alt="product-img" />
                        <div class="preview-meta">
                            <ul>
                                <li>
                                    <span  data-toggle="modal" id="${element._id}" onclick="openModalProduct(this)" data-target="#product-modal">
                                        <i class="tf-ion-ios-search-strong"></i>
                                    </span>
                                </li>
                                <li>
                                    <a href="#!" ><i class="tf-ion-ios-heart"></i></a>
                                </li>
                                <li>
                                    <a href="#!"><i class="tf-ion-android-cart"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="product-content">
                        <h4><a href="product-single.html">${element.name}</a></h4>
                        <p class="price">Rs. ${element.price}</p>
                    </div>
                </div>
            </div>
            `
        });
    }
    else{
        // let categoryName = document.getElementById(`${ele._id}`).innerHTML;
        // console.log(categoryName);
        productRow.innerHTML=`<h2 class='text-center' >No Product with Category : ${$(`#${ele.id}`).text()}</h2>`
    }
    })
}

// function getCartInfo(){
//     let userId = localStorage.getItem('user');
//     let header = new Headers();
//     header.append('Content-Type','application/json');
//     fetch(`/shop/userCart?id=${userId}`,{
//         headers:header,
//         method:'GET'
//     })
//     .then(res=>res.json())
//     .then(data=>{
//         localStorage.setItem('cart',JSON.stringify(data));
//         let cartDiv = document.getElementById('cartDiv');
//         cartDiv.innerHTML=''
//         data.forEach(ele=>{
//         cartDiv.innerHTML+=
//         `

//         <!-- Cart Item -->
//         <div class="media">
//             <a class="pull-left" href="#!">
//                 <img class="media-object" src="../productImg/${ele.product.primaryImage}" alt="image" />
//             </a>
//             <div class="media-body">
//                 <h4 class="media-heading"><a href="#!">${ele.product.name} (${ele.size})</a></h4>
//                 <div class="cart-price">
//                     <span>${ele.quantity} X </span>
//                     <span>${ele.product.price}</span>
//                 </div>
//                 <h5><strong>₹ ${parseInt(ele.quantity) * parseInt(ele.product.price)}</strong></h5>
//             </div>
//             <a href="#!" class="remove"><i class="tf-ion-close"></i></a>
//         </div>
//         `
//     })
//     })
//     .catch(err=>console.log(err))
// }
// getCartInfo();
function addToCart(){
    let productQty = $('#product-quantity').val()
    let productSize = $('#productSize').val().split('_')[0];
    let searchParams = new URLSearchParams(window.location.search)
    let productId = searchParams.get('id');
    let userId = localStorage.getItem('user');
    if(userId){
        let cartObj = {userId,productId,productQty,productSize}
        let header = new Headers();
        header.append('Content-Type','application/json');
        fetch('/shop/addToCart',{
            method : "POST",
            headers:header,
            body : JSON.stringify(cartObj)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                alert('Added');
                getCartInfo();
            }
            else{
                if(data.error){
                    alert(data.error);
                }
                else{
                    alert('Error Occured...')
                }
            }
        })
        .catch(err=>console.log(err))
    }
    else{
        alert('Please Login Before Adding to Cart....')
    }
}