// Obtener elementos de botón
let btnCreate = document.getElementById("btn-create");
let btnUpdate = document.getElementById("btn-update");
let btnDelete = document.getElementById("btn-delete");
let cleanCreateForm = document.getElementById("btn-clean-create");
let cleanUpdateForm = document.getElementById("btn-clean-update");

// Escuchadores de botones
btnCreate.addEventListener("click", createFood);
btnUpdate.addEventListener("click", updateFood);
btnDelete.addEventListener("click", deleteFood);
cleanCreateForm.addEventListener("click", cleanFormCreate);
cleanUpdateForm.addEventListener("click", cleanFormUpdate);

let foods = []; // Arreglo creado con datos JSON de alimentos
let foodCategories = {}; // Arreglo creado con datos JSON de categorías de alimentos
let foodStatus = []; // Arreglo creado con datos JSON de estatus
let indexFoodSelected;

function loadData() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/foods.json")
            .then((response) => response.json())
            .then((data) => {
                foods = data;
                console.log("Alimentos cargados:", foods);
            }),
        fetch("http://127.0.0.1:5500/admin/data/categories.json")
            .then((response) => response.json())
            .then((data) => {
                foodCategories = data;
                console.log("Categorías cargadas:", foodCategories);
            }),
        fetch("http://127.0.0.1:5500/admin/data/status.json")
            .then((response) => response.json())
            .then((data) => {
                foodStatus = data;
                console.log("Estatus cargados:", foodStatus);
            })
    ]);
}

function updateTable() {
    let cuerpo = "";
    let category;
    let status;

    foods.forEach(function (elemento) {
        for (let i = 0; i < foodCategories["alimentos"].length; i++) {
            if (foodCategories["alimentos"][i].id == elemento.category) {
                category = foodCategories["alimentos"][i].category;
                break;
            }
        }

        for (let i = 0; i < foodStatus.length; i++) {
            if (foodStatus[i].id == elemento.status) {
                status = foodStatus[i].status;
                break;
            }
        }

        let registro = '<tr>' +
            '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal">' +
            '<td>' + Number(foods.indexOf(elemento) + 1) + '</td>' +
            '<td>' + elemento.name + '</td>' +
            '<td>' + elemento.description + '</td>' +
            '<td>' + category + '</td>' +
            '<td>' + elemento.price + '</td>' +
            '<td><img class="table__item-img" src="' + elemento.image + '" width="100"></td>' +
            '<td>' + (status ? "Activo" : "Inactivo") + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-alimento").innerHTML = cuerpo;
    let rowsFood = document.querySelectorAll(".table-row");
    for (let i = 0; i < rowsFood.length; i++) {
        rowsFood[i].onclick = () => selectFood(i);
    }
}

function selectFood(index) {
    let alimento = foods[index];
    document.getElementById("name-meal-update").value = alimento.name;
    document.getElementById("description-meal-update").value = alimento.description;
    document.getElementById("category-meal-update").value = alimento.category;
    document.getElementById("price-meal-update").value = alimento.price;
    document.getElementById("status-meal-update").value = alimento.status;
    indexFoodSelected = index;
}

function cleanFormCreate() {
    document.getElementById("name-meal").value = "";
    document.getElementById("description-meal").value = "";
    document.getElementById("category-meal").value = "0";
    document.getElementById("price-meal").value = "";
    document.getElementById("image-meal").value = "";
}

function cleanFormUpdate() {
    document.getElementById("name-meal-update").value = "";
    document.getElementById("description-meal-update").value = "";
    document.getElementById("category-meal-update").value = "0";
    document.getElementById("price-meal-update").value = "";
    document.getElementById("image-meal-update").value = "";
    document.getElementById("status-meal-update").value = "0";
}

async function createFood() {
    let name = document.getElementById("name-meal").value;
    let description = document.getElementById("description-meal").value;
    let category = document.getElementById("category-meal").value;
    let price = document.getElementById("price-meal").value;
    let imageMealCreate = document.getElementById("image-meal");
    let file = imageMealCreate.files[0];
    let image = null;

    if (file) {
        try {
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
        foods.push(newProd);
        cleanFormCreate();
        updateTable();
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}

async function updateFood() {
    let name = document.getElementById("name-meal-update").value;
    let description = document.getElementById("description-meal-update").value;
    let category = document.getElementById("category-meal-update").value;
    let price = document.getElementById("price-meal-update").value;
    let status = document.getElementById("status-meal-update").value;
    let imageMealUpdate = document.getElementById("image-meal-update");

    let file = imageMealUpdate.files[0];
    let image = null;

    if (file) {
        try {
            image = await getBase64Image(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    foods[indexFoodSelected].name = name;
    foods[indexFoodSelected].description = description;
    foods[indexFoodSelected].price = price;
    foods[indexFoodSelected].category = category;
    foods[indexFoodSelected].status = status;
    foods[indexFoodSelected].image = image || foods[indexFoodSelected].image;
    updateTable();
}

function deleteFood() {
    let nuevoArreglo = [];
    let elementoSeleccionado = foods[indexFoodSelected];
    foods.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    foods = nuevoArreglo;
    updateTable();
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            resolve(e.target.result);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

loadData().then(() => {
    updateTable();
});
