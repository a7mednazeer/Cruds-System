let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDescription = document.getElementById("productDescription");

let addProduct = document.getElementById("addProduct");
let editProduct = document.getElementById("editProduct");
let cancelEdit = document.getElementById("cancelEdit");
let clearAll = document.getElementById("clearAll");

let products = [];
let indexOfEdit=0 ;



if(localStorage.getItem("dataOfProducts") != null) {
    products = JSON.parse(localStorage.getItem('dataOfProducts'));
    display(products);
    clearAll.classList.remove('d-none');
}



function addition() {
    if (validationName() && validationPrice() && validationCategory() && validationDescription()) {
        let inputs = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value
        }
        products.push(inputs);
        localStorage.setItem("dataOfProducts",JSON.stringify(products));
        display(products);
        clear();

        clearAll.classList.remove('d-none');

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
    } else {
        alert("Invalid");
    }
}



function display(arrayData) {
    let table = ``;

    for (let i=0 ; i<arrayData.length ; ++i) {
        table += `  <tr>
                        <td>${i+1}</td>
                        <td>${arrayData[i].name}</td>
                        <td>${arrayData[i].price}</td>
                        <td>${arrayData[i].category}</td>
                        <td>${arrayData[i].description}</td>
    
                        <td class="text-center">
                            <button onclick="setEditing(${i})" class="fw-bolder btn btn-outline-success">Edit</button>
                            <button onclick="deleteProduct(${i})" class="fw-bolder btn btn-outline-danger">Delete</button>
                        </td>
                    </tr> `
    }
    document.getElementById("tableBody").innerHTML = table;
}



function clear() {
    productName.value = "" ;
    productPrice.value = "" ;
    productCategory.value = "" ;
    productDescription.value = "" ;
}



function search(dataValue) {
    let dataSearch = [];
    
    for (let i=0 ; i<products.length ; ++i) {

        if (products[i].name.toUpperCase().includes(dataValue.toUpperCase())) {
            dataSearch.push(products[i]);
            display(dataSearch);
        } else {
            display(dataSearch);
        }
    }
}



function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("dataOfProducts",JSON.stringify(products));
    display(products);

    if (products.length == 0) {
        clearAll.classList.add('d-none');
    }
}



function setEditing(index) {
    // let product = products[index];
    indexOfEdit = index;
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].description;
    
    validationName();
    validationPrice();
    validationCategory();
    validationDescription();

    addProduct.classList.add('d-none');
    editProduct.classList.remove('d-none');
    cancelEdit.classList.remove('d-none');
}



function edit() {
    if (validationName() && validationPrice() && validationCategory() && validationDescription()) {
        products[indexOfEdit].name = productName.value;
        products[indexOfEdit].price = productPrice.value;
        products[indexOfEdit].category = productCategory.value;
        products[indexOfEdit].description = productDescription.value;

        addProduct.classList.remove('d-none');
        cancelEdit.classList.add('d-none');
        editProduct.classList.add('d-none');
        
        localStorage.setItem("dataOfProducts",JSON.stringify(products));
        display(products);
        clear();

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
    } else {
        alert("Invalid");
    }
}



function cancel() {
    addProduct.classList.remove('d-none');
    cancelEdit.classList.add('d-none');
    editProduct.classList.add('d-none');

    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");

    display(products);
    clear();
}



function clearAllData() {
    localStorage.clear();
    products = [];
    display(products);
    clearAll.classList.add('d-none');
}



function validationName() {
    let x = /^[A-Z][a-z]+$/

    if (x.test(productName.value)) {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid");
        return true;
    } else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        return false;
    }
}



function validationPrice() {
    let x = /^(1|10000|[1-9]\d{0,3})$/

    if (x.test(productPrice.value)) {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.add("is-valid");
        return true;
    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        return false;   
    }
}



function validationCategory() {
    let x = /^[A-Z][a-z]{1,10}$/

    if (x.test(productCategory.value)) {
        productCategory.classList.remove("is-invalid");
        productCategory.classList.add("is-valid");
        return true;
    } else {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        return false;   
    }
}



function validationDescription() {
    let x = /^([A-Z][a-z]* ?)([a-z]+ ?)+$/

    if (x.test(productDescription.value)) {
        productDescription.classList.remove("is-invalid");
        productDescription.classList.add("is-valid");
        return true;
    } else {
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
        return false;   
    }
}



