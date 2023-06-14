function categoryOption() {
    let categorySelect = document.getElementById('category');
    let header = new Headers();
    header.append("Content-Type", "application/json");
    fetch('/category/allCategory', {
        method: "GET",
        headers: header
    })
        .then(response => response.json())
        .then(data => {
            categorySelect.innerHTML = '';
            data.forEach(element => {
                categorySelect.innerHTML += `
                <option value="${element._id}">${element.name}</option>
            `
            });
        })
}
if(window.location.href.includes('/addProduct')){
    categoryOption()
}

async function addProductData(id='1',editProduct=false) {
    // Input values.
    let name = $('#name').val();
    let category = $('#category').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let material = $('#material').val();
    let s_qty = $('#s_qty').val();
    let m_qty = $('#m_qty').val();
    let l_qty = $('#l_qty').val();
    let xl_qty = $('#xl_qty').val();
    let primaryImg = document.getElementById('primaryImg');
    let secondaryImg = document.getElementById('secondaryImg');
    let submitFlag = true;
    if (!name) {
        $('#invalidName').css('display', 'block');
        submitFlag = false
    } else {
        $('#invalidName').css('display', 'none');
    }
    if (!category) {
        $('#invalidCategory').css('display', 'block');
        submitFlag = false
    } else {
        $('#invalidCategory').css('display', 'none');
    }
    if (price <= 0) {
        $('#invalidPrice').css('display', 'block');
        submitFlag = false
    } else {
        $('#invalidPrice').css('display', 'none');
    }
    if (!description) {
        $('#invalidDescription').css('display', 'block');
        submitFlag = false
    } else {
        $('#invalidDescription').css('display', 'none');
    }
    if (!material) {
        $('#invalidMaterial').css('display', 'block');
        submitFlag = false
    } else {
        $('#invalidMaterial').css('display', 'none');
    }
    let inValidImage = (img) => {
        try {
            return img.files[0].type.split("/")[0] == 'image' ? false : true
        }
        catch {
            return true
        }
    }
    // upload img when??
    // editproduct false and invalidImg False 
    // editProduct true and imgField value is empty 
    // 
    if (inValidImage(primaryImg) && ! editProduct) {
        $('#invalidPrimaryImg').css('display', 'block');
        submitFlag = false
    }
    else if  (editProduct && primaryImg.value!='' && inValidImage(primaryImg)){
        $('#invalidPrimaryImg').css('display', 'block');
        submitFlag = false
    }
    else {
        $('#invalidPrimaryImg').css('display', 'none');
    }
    if (inValidImage(secondaryImg)  && ! editProduct) {
        $('#invalidSecondaryImg').css('display', 'block');
        submitFlag = false
    } 
    else if  (editProduct && secondaryImg.value!='' && inValidImage(secondaryImg)){
        $('#invalidSecondaryImg').css('display', 'block');
        submitFlag = false
    }
    else {
        $('#invalidSecondaryImg').css('display', 'none');
    }
    if (submitFlag) {
        let formData = new FormData();
        if(editProduct){
            formData.append('productId',id);
        }
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('material', material);
        formData.append('primaryImage', primaryImg.files[0]);
        formData.append('secondaryImage',secondaryImg.files[0]);
        formData.append('size_s', s_qty ? s_qty : 0);
        formData.append('size_m', m_qty ? m_qty : 0);
        formData.append('size_l', l_qty ? l_qty : 0);
        formData.append('size_xl', xl_qty ? xl_qty : 0);
        let options = {
            method: editProduct ?  'PUT' : 'POST',
            body: formData
        }
        let url = editProduct ? "/product/updateProduct" : "/product/newProduct";
        let fetchRes = fetch(url,options);
        fetchRes.then(res =>
            res.json()).then(d => {
                if(d.success){
                    window.location.href='/product/list'
                }
            })
    }
}

function productTableData(){
    let productBody = document.getElementById('productBody');
    $('#loaderCart').fadeIn('slow');
    productBody.innerHTML='';
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch('/product/allProductData',{
        headers:headers,
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        $('#loaderCart').fadeOut('slow');
        data.forEach(ele=>{
            productBody.innerHTML+=
            `
            <tr>
                <td style="width: 20%;">${ele.name}</td>
                <td style="width: 20%;">${ele.category.name}</td>
                <td style="width: 10%;">${ele.price}</td>
                <td style="width: 5%;">${ele.material}</td>
                <td style="width: 5%;">${ele.size_s}</td>
                <td style="width: 5%;">${ele.size_m}</td>
                <td style="width: 5%;">${ele.size_l}</td>
                <td style="width: 5%;">${ele.size_xl}</td>
                <td style="width: 10%; height:100px;"><img src="../productImg/${ele.primaryImage}" width="" style="width: 100%;height:100%;object-fit:contain;" alt=""></td>
                <td style="width: 10%; height:100px;"><img src="../productImg/${ele.secondaryImage}" width="" style="width: 100%;height:100%;object-fit:contain;" alt=""></td>
                <td style="width: 10%;"><button type="button" id=${JSON.stringify('productEdit_'+ele._id)} class="btn btn-default" data-toggle="modal" onclick="updateProductModal(this.id)" data-target="#productEditModal"><i class="tf-pencil2"></i></button> <button type="button" id=${JSON.stringify(ele._id)} onclick="deleteProductData(this.id)" class="btn btn-default" style="margin-top: 5px;" ><i class="tf-ion-trash-a"></i></button></td>
            </tr>
            `
        })
    })
    .catch(err=>console.log(err))
}

function deleteProductData(id){
    if(confirm('Are you sure you want to delete??')==true){
        $('#loaderCart').fadeIn('slow');
        let header = new Headers();
        header.append('Content-Type','application/json');
        fetch('/product/deleteProduct',{
            headers:header,
            method:"DELETE",
            body:JSON.stringify({productId:id})
        })
        .then(res=>res.json())
        .then(data=>{
            $('#loaderCart').fadeOut('slow');
            productTableData();
        })
        .catch(err=>alert(err))
    }
}

function updateProductModal(id){
    // let productId = id;
    let productId = id.split('_')[1];
    let header = new Headers();
    header.append('Content-Type','application/json');
    $('#loaderCart').fadeIn('slow');
    fetch(`getProduct?productId=${productId}`,{
        headers:header,
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
        let productEditBody = document.getElementById('productEditBody');
        let updateModalBtn = document.getElementById('updateModalBtn');
        updateModalBtn.onclick = addProductData.bind(this,productId,true),
        productEditBody.innerHTML=`
        <form class="text-left clearfix" >
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" value="${data.name}" placeholder="Name">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidName" role="alert"><i class="tf-ion-alert-circled"></i><span>Enter proper name.</span></div>
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select name="category" id="category" class="form-control"></select>
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidCategory" role="alert"><i class="tf-ion-alert-circled"></i><span>Select category.</span></div>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" class="form-control" id="price" value=${data.price} placeholder="Price">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidPrice" role="alert"><i class="tf-ion-alert-circled"></i><span>Enter Price.</span></div>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" value="${data.description}"  placeholder="Description">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidDescription" role="alert"><i class="tf-ion-alert-circled"></i><span>Enter description.</span></div>
            </div>
            <div class="form-group">
                <label for="material">Material</label>
                <input type="text" class="form-control" id="material" value=${data.material}  placeholder="Material Type Ex. Cotton">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidMaterial" role="alert"><i class="tf-ion-alert-circled"></i><span>Enter material type.</span></div>
            </div>
            <div class="form-group">
                <label for="s_qty">S Size</label>
                <input type="number" class="form-control" id="s_qty" value=${data.size_s} min="0" oninput="validity.valid||(value='');" placeholder="S Size Qty">
            </div>
            <div class="form-group">
                <label for="m_qty">M Size</label>
                <input type="number" class="form-control" id="m_qty" min="0" value=${data.size_m} oninput="validity.valid||(value='');" placeholder="M Size Qty">
            </div>
            <div class="form-group">
                <label for="l_qty">L Size</label>
                <input type="number" class="form-control" id="l_qty" min="0" value=${data.size_l} oninput="validity.valid||(value='');" placeholder="L Size Qty">
            </div>
            <div class="form-group">
                <label for="xl_qty">XL Size</label>
                <input type="number" class="form-control" id="xl_qty" min="0" value=${data.size_xl} oninput="validity.valid||(value='');" placeholder="XL Size Qty">
            </div>
            <div class="form-group">
                <label for="primaryImg">Primary Image</label>
                <input type="file" class="form-control" id="primaryImg" name="primaryImage" accept="image/*" placeholder="Image">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidPrimaryImg" role="alert"><i class="tf-ion-alert-circled"></i><span>Select image file only.</span></div>
            </div>
            <div class="form-group">
                <label for="secondaryImg">Secondary Image</label>
                <input type="file" class="form-control" id="secondaryImg" accept="image/*" placeholder="Image">
                <div class="alert alert-danger alert-common alert-solid" style="display: none;margin-top: 5px;" id="invalidSecondaryImg" role="alert"><i class="tf-ion-alert-circled"></i><span>Select image file only.</span></div>
            </div>
        </form>
        `
        categoryOption();
        $('#loaderCart').fadeOut('slow');
    })
    .catch(err=>console.log(err))
}

if(window.location.href.includes('/list')){
    productTableData();
}