function viewOrder(orderId){
    let header = new Headers();
    header.append('Content-Type','application/json');
    fetch(`/order/singleOrderDetail?order=${orderId}`,{
        headers:header,
        method:"GET",
    })
    .then(res=>res.json())
    .then(data=>{
        let orderModalItemBody = document.getElementById('orderModalItemBody');
        let orderModalPrice = document.getElementById('orderModalPrice');
        orderModalPrice.innerHTML = `₹${data.orderData.amount}`
        let orderModalTotal = document.getElementById('orderModalTotal');
        orderModalTotal.innerHTML = `₹${data.orderData.amount}`
        let items = data.orderData.items;
        orderModalItemBody.innerHTML='';
        items.forEach(element => {
            orderModalItemBody.innerHTML+=
            `
               <div class="media product-card">
                   <a class="pull-left" href="product-single.html">
                   <img class="media-object" src="../productImg/${element.product.primaryImage}" alt="Image" />
                   </a>
                   <div class="media-body">
                   <h4 class="media-heading"><a href="/shop/preview?id={{product._id}}">${element.product.name} (${element.size})</a></h4>
                   <p class="price">${element.quantity} x ₹ ${element.product.price}</p>
                   </div>
               </div>
            `
        });
    })
    .catch(err=>console.log(err));
}