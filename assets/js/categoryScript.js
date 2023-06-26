function addCategoryInputBox(){
    $("#addCategBtn").prop("disabled",true);
    let categoryBody = document.getElementById('categoryBody');
    categoryBody.innerHTML+=`
        
    <tr>
    <td>
        <input type="text" style='width:80%;margin:auto;' class="form-control" id="newCateg" placeholder="Ex. Electronics">
    </td>
    <td>
      <div class="btn-group" role="group">
        <button type="button"  onclick='addCategory()' class="btn btn-default"><i class="tf-ion-android-clipboard" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-default"><i class="tf-ion-close" aria-hidden="true"></i></button>
      </div>
    </td>
  </tr>
    `
}
function categoryData(){
  let header = new Headers();
  let categoryBody = document.getElementById('categoryBody');
  $("#addCategBtn").prop("disabled",false);
  if(categoryBody){
    categoryBody.innerHTML = "";
  }
  $('#loaderCart').fadeIn('slow');
  header.append("Content-Type", "application/json");
  fetch("/category/allCategory",{
      method:"GET",
      headers:header,
  })
  .then(response => response.json())
  .then(data=>{
    $('#loaderCart').fadeOut('slow');
    data.forEach(element => {
      categoryBody.innerHTML+=`<tr>
        <td>${element.name}</td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" onclick='deleteCateg(${JSON.stringify(element._id)})' ><i class="tf-ion-close" aria-hidden="true"></i></button>
          </div>
        </td>
      </tr>`
    });
  })

  .catch(err=>console.log(err))
}
categoryData()
function addCategory(){
  let newCateg = $("#newCateg").val();
  if(newCateg){
    let header = new Headers();
    header.append("Content-Type", "application/json");
    fetch("/category/addCategory",{
        method:"POST",
        headers:header,
        body:JSON.stringify({'name':newCateg})
    })
    .then(response => response.json())
    .then(data=>{
      categoryData()
    })
    .catch(err=>console.log(err))
  }
}
function deleteCateg(id){ 
  if(id){
    let header = new Headers();
    header.append("Content-Type", "application/json");
    fetch("/category/deleteCategory",{
        method:"DELETE",
        headers:header,
        body:JSON.stringify({'_id':id})
    })
    .then(response => response.json())
    .then(data=>{
      categoryData()
    })
    .catch(err=>console.log(err))
  }
}
