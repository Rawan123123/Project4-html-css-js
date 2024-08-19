let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else {
        total.innerHTML = '0';
        total.style.background = 'brown'
    }
}
getTotal()

let datapro;
if (localStorage.product != null)
    datapro = JSON.parse(localStorage.product);
else
    datapro = [];
submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count < 100) {
        if (mood == 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }
            else {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro;
            mood = 'create';
            count.style.display = 'block';
            submit.innerHTML = 'create';
        }
        clearData();
    }
    localStorage.setItem('product', JSON.stringify(datapro));
    showData();
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showData() {
    getTotal();
    let table = ``;
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick="updateElement(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>

         </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnd = document.getElementById('deletAll');
    if (datapro.length > 0) {
        btnd.innerHTML = `<button>Delete All (${datapro.length})</button>`;
    }
    else
        btnd.innerHTML = '';
}
showData()

function deleteAll() {
    localStorage.clear();
    datapro = [];
    document.getElementById('tbody').innerHTML = '';
    showData();
}
function deleteElement(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}
function updateElement(i) {
    mood = 'update';
    tmp = i;
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    total.value = datapro[i].total;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    showData();
}

let searchmood='title';
function getmood(id){
if(id=='searchTitle')
    searchmood='title';
else
    searchmood='category';

search.focus();
search.placeholder='search by '+ searchmood;
search.value='';
}
function searchfun(value) {
    let table = ``;
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {      
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick="updateElement(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>

                    </tr>`
            }
        }
        else{
            if (datapro[i].category.includes(value.toLowerCase())){     
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick="updateElement(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>

                    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}