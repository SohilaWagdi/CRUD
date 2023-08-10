

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var productList ;
var addprodbtn = document.getElementById("addprodbtn");
var updatebtn = document.getElementById("updatebtn");
var updateEleme;
// console.log("di localstorge",localStorage.getItem("productList"));
if (localStorage.getItem("productList")==null){
    productList = [];
}else {
    productList= JSON.parse(localStorage.getItem("productList")) ;
    // console.log(productList);
    displayProduct(productList);
}

function addProduct(){
  if (validation()==true && validModel()== true && validDesc()== true && validPrice()==true){
var product = {
    name : productName.value,
    price :productPrice.value,
    model :productModel.value ,
    desc : productDesc.value ,
 
}
productList.push(product); 
displayProduct(productList) ; 
localStorage.setItem("productList",JSON.stringify(productList));
 clearForm();
    // console.log("hello from the other side" , productList);
    updateElements();
} else{
    
}
}

function clearForm(){
    productName.value =""
    productPrice.value =""
    productModel.value =""
    productDesc.value =""
    productName.style.border ="none"
    productPrice.style.border ="none"
    productModel.style.border ="none"
    productDesc.style.border ="none"
}

function displayProduct(products){
    cartona  =``
    for(var i = 0 ; i < products.length ; i++){

        cartona += ` <tr>
        <td> ${i+1}</td>
        <td> ${ products[i].newName ? products[i].newName : products[i].name }</td>
        <td>${ products[i].price } </td>
        <td>${ products[i].model } </td>
        <td> ${ products[i].desc } </td>
      <td> <button onclick="getUpdated(${i})" class="btn btn-warning btn-sm"> Update</button></td>
        <td> <button onclick="deleteproduct(${i})" class="btn btn-danger btn-sm"> Delete</button></td>
      </tr>`
    }

document.getElementById("tBody").innerHTML=cartona ;
}
function deleteproduct(index){

productList.splice(index,1);
// console.log('elly tms7t', productList)
localStorage.setItem("productList",JSON.stringify(productList));

displayProduct(productList)
}

function searchByName(term){
    var foundeditems =[]
   for (var i = 0 ; i<productList.length ; i++){
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())==true) {
        productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(),`<span class="text-danger">${term}</span>`);

        // console.log("founded",i)
foundeditems.push(productList[i]); 
    }
   }
   displayProduct(foundeditems)
}

function getUpdated(item){
    console.log(item,"updated")
    addprodbtn.classList.add("d-none");
    updatebtn.classList.replace("d-none","d-block")

    productName.value = productList[item].name;
    productPrice.value = productList[item].price;
    productModel.value = productList[item].model;
    productDesc.value = productList[item].desc;
    updateEleme = item;
    // updateElements(productList[item]);

}
function updateElements(){
    productList[updateEleme].name= productName.value ;
    productList[updateEleme].price= productPrice.value ;
    productList[updateEleme].model= productModel.value ;
    productList[updateEleme].desc= productDesc.value ;
    localStorage.setItem("productList",JSON.stringify(productList));
    displayProduct(productList);
  addprodbtn.classList.replace("d-none","d-block");
    updatebtn.classList.replace("d-block","d-none"); 
    clearForm();
}
   

function validPrice(){
    var regexP= /^([1-9][0-9]{3}|10000)$/;
    if(regexP.test(productPrice.value)==true){
       
        productPrice.style.border ="4px green solid"
        productPrice.style.boxShadow="0 0 0.5rem green "
        document.getElementById("wrongprice").classList.add("d-none")

 return true ;
    }else{
        document.getElementById("wrongprice").classList.remove("d-none")
        productPrice.style.border ="4px red solid"
        productPrice.style.boxShadow="0 0 0.5rem red "

        return false;
    }
}
function validation(){
    var regex= /^[A-Z][a-z]{1,9}$/;
    if(regex.test(productName.value)==true){
       
        productName.style.border ="4px green solid"
        productName.style.boxShadow="0 0 0.5rem green "
        document.getElementById("wrongname").classList.add("d-none")

 return true ;
    }else{
        document.getElementById("wrongname").classList.remove("d-none")
        productName.style.border ="4px red solid"
        productName.style.boxShadow="0 0 0.5rem red "

        return false;
    }
}
function validModel(){
    var regexM = /(tv|mobile|laptop)$/;
    if(regexM.test(productModel.value)==true){
       
        productModel.style.border ="4px green solid"
        productModel.style.boxShadow="0 0 0.5rem green "
        document.getElementById("wrongModel").classList.add("d-none")

 return true ;
    }else{
        document.getElementById("wrongModel").classList.remove("d-none")
        productModel.style.border ="4px red solid"
        productModel.style.boxShadow="0 0 0.5rem red "

        return false;
    }
}
function validDesc(){
    var regexD =/[A-Za-z0-9_& ,.?;!]{5,250}$/
    if(regexD.test(productDesc.value)==true){
       
        productDesc.style.border ="4px green solid"
        productDesc.style.boxShadow="0 0 0.5rem green "
        document.getElementById("descempty").classList.add("d-none")
 return true ;
    }else{
        document.getElementById("descempty").classList.remove("d-none")
        productDesc.style.border ="4px red solid"
        productDesc.style.boxShadow="0 0 0.5rem red "

        return false;
    }
}
