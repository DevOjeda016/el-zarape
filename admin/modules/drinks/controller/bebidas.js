//Get button elements
let btnCreate = document.getElementById("btn-create");
let btnUpdate = document.getElementById("btn-update");
let btnDelete = document.getElementById("btn-delete");
let cleanCreateForm = document.getElementById("btn-clean-create");
let cleanUpdateForm = document.getElementById("btn-clean-update");

//Button listeners
btnCreate.addEventListener("click", createDrink);
btnUpdate.addEventListener("click", updateDrink);
btnDelete.addEventListener("click", deleteDrink);
cleanCreateForm.addEventListener("click", cleanFormCreate);
cleanUpdateForm.addEventListener("click", cleanFormUpdate);

let drinks = []; // Array created with drink JSON data
let aCategories = {}; // Array created with categories JSON data
let aStatus = []; // Array created with status JSON data
let indexDrinkSelected;

function loadData() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/drinks.json")
            .then((response) => response.json())
            .then((data) => {
                drinks = data;
                console.log("Bebidas cargadas:", drinks);
            }),
        fetch("http://127.0.0.1:5500/admin/data/categories.json")
            .then((response) => response.json())
            .then((data) => {
                aCategories = data;
                console.log("Categorías cargadas:", aCategories);
            }),
        fetch("http://127.0.0.1:5500/admin/data/status.json")
            .then((response) => response.json())
            .then((data) => {
                aStatus = data;
                console.log("Estatus cargados:", aStatus);
            })
    ]);
}

function updateTable() {
    let cuerpo = "";
    let category;
    let status;

    drinks.forEach(function (elemento) {
        for (let i = 0; i < aCategories["bebidas"].length; i++) {
            if (aCategories["bebidas"][i].id == elemento.category) {
                category = aCategories["bebidas"][i].category;
                break;
            }
        }

        for (let i = 0; i < aStatus.length; i++) {
            if (aStatus[i].id == elemento.status) {
                status = aStatus[i].status;
                break;
            }
        }

        let registro = '<tr>' +
            '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal">' +
            '<td>' + Number(drinks.indexOf(elemento) + 1) + '</td>' +
            '<td>' + elemento.name + '</td>' +
            '<td>' + elemento.description + '</td>' +
            '<td>' + category + '</td>' +
            '<td>' + elemento.price + '</td>' +
            '<td><img class="table__item-img" src="' + elemento.image + '" width="100"></td>' +
            '<td>' + (status ? "Activo" : "Inactivo") + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-bebida").innerHTML = cuerpo;
    let rowsDrink  = document.querySelectorAll(".table-row");
    for (let i = 0; i < rowsDrink.length; i++) {
        rowsDrink[i].onclick = () => selectDrink(i);
    }
}
//En proceso
/*function previewCreate() {
    let name = document.getElementById("name-drink-update").value;
    let description = document.getElementById("description-drink-update").value;
    let categoria = document.getElementById("category-drink-update").value;
    let price = document.getElementById("price-drink-update").value;
    let estatus = document.getElementById("status-drink-update").value;
    let imageDrinkUpdate = document.getElementById("image-drink-update");
    let img = '<img src="' + 
}*/

// Función para seleccionar un producto y llenar el modal de actualización
function selectDrink(index) {
    let bebida = drinks[index];
    document.getElementById("name-drink-update").value = bebida.name;
    document.getElementById("description-drink-update").value = bebida.description;
    document.getElementById("category-drink-update").value = bebida.category;
    document.getElementById("price-drink-update").value = bebida.price;
    document.getElementById("status-drink-update").value = bebida.status;
    indexDrinkSelected = index;
}


function cleanFormCreate() {
        document.getElementById("name-drink").value = "";
        document.getElementById("description-drink").value = "";
        document.getElementById("category-drink").value = "0";
        document.getElementById("price-drink").value = "";
        document.getElementById("image-drink").value = "";
}

function cleanFormUpdate() {
        document.getElementById("name-drink-update").value = "";
        document.getElementById("description-drink-update").value = "";
        document.getElementById("category-drink-update").value = "0";
        document.getElementById("price-drink-update").value = "";
        document.getElementById("image-drink-update").value = "";
        document.getElementById("status-drink-update").value = "0";
}


async function createDrink() {
    let name = document.getElementById("name-drink").value;
    let description = document.getElementById("description-drink").value;
    let category = document.getElementById("category-drink").value;
    let price = document.getElementById("price-drink").value;
    let imageDrinkCreate = document.getElementById("image-drink");
    // Acceder al archivo seleccionado
    let file = imageDrinkCreate.files[0];
    let image = null;

    if (file) {
        try {

            // Convertir la imagen a base64
            image = await getBase64Image(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    if (name && description && category && price && image) {
        let newProd = {
            name,
            description,
            price,
            category,
            image,
            status: "1"
        };
        drinks.push(newProd);
        cleanFormCreate();
        updateTable();
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Evento cuando la lectura se completa
        reader.onload = function (e) {
            resolve(e.target.result); // Retorna la cadena base64
        };

        // Evento en caso de error
        reader.onerror = function (error) {
            reject(error);
        };

        // Leer el archivo como una URL de datos (data URL)
        reader.readAsDataURL(file);
    });
}

async function updateDrink() {
    let name = document.getElementById("name-drink-update").value;
    let description = document.getElementById("description-drink-update").value;
    let category = document.getElementById("category-drink-update").value;
    let price = document.getElementById("price-drink-update").value;
    let status = document.getElementById("status-drink-update").value;
    let imageDrinkUpdate = document.getElementById("image-drink-update");

    // Acceder al archivo seleccionado
    let file = imageDrinkUpdate.files[0];
    let image = null;

    if (file) {
        try {
            // Convertir la imagen a base64
            image = await getBase64Image(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    drinks[indexDrinkSelected].name = name;
    drinks[indexDrinkSelected].description = description;
    drinks[indexDrinkSelected].price = price;
    drinks[indexDrinkSelected].category = category;
    drinks[indexDrinkSelected].status = status;
    drinks[indexDrinkSelected].image = image || drinks[indexDrinkSelected].image;
    updateTable();

}


function deleteDrink() {
    let nuevoArreglo = [];
    let elementoSeleccionado = drinks[indexDrinkSelected];
    drinks.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    drinks = nuevoArreglo;
    updateTable();
}

// Cargar los datos y luego actualizar la tabla
loadData().then(() => {
    updateTable();
});