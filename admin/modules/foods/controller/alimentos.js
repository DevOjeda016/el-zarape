let alimentos = []; // Arreglo que se llenará de alimentos objetos JSON
let categorias = {};
let estatus = {};
let indexProductosSeleccionados;

function cargarDatos() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/foods.json")
            .then((response) => response.json())
            .then((data) => {
                alimentos = data;
                console.log("Alimentos cargados:", alimentos);
            }),
        fetch("http://127.0.0.1:5500/admin/data/categories.json")
            .then((response) => response.json())
            .then((data) => {
                categorias = data;
                console.log("Categorías cargadas:", categorias);
            }),
        fetch("http://127.0.0.1:5500/admin/data/status.json")
            .then((response) => response.json())
            .then((data) => {
                estatus = data;
                console.log("Estatus cargados:", estatus);
            })
    ]);
}

function actualizaTabla() { 
    let cuerpo = "";
    let categoria;
    let status;

    alimentos.forEach(function (elemento) {
        for (let i = 0; i < categorias["alimentos"].length; i++) {
            if (categorias["alimentos"][i].id == elemento.categoria) {
                categoria = categorias["alimentos"][i].categoria;
                break;
            }
        }

        for (let i = 0; i < estatus.length; i++) {
            if (estatus[i].id == elemento.estatus) {
                status = estatus[i].status;
                break;
            }
        }

        let registro = '<tr>' +
            '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal" onclick="selectProducto(' + alimentos.indexOf(elemento) + ');">' +
            '<td>' + Number(alimentos.indexOf(elemento) + 1) + '</td>' +
            '<td>' + elemento.nombre + '</td>' +
            '<td>' + elemento.descripcion + '</td>' +
            '<td>' + categoria + '</td>' +
            '<td>' + elemento.precio + '</td>' +
            '<td><img class="table__item-img" src="' + elemento.imagen + '"></td>' +
            '<td>' + status + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-alimento").innerHTML = cuerpo;
}

// Función para seleccionar un producto y llenar el modal de actualización
function selectProducto(index) {
    let alimento = alimentos[index];
    document.getElementById("name-meal-update").value = alimento.nombre;
    document.getElementById("description-meal-update").value = alimento.descripcion;
    document.getElementById("category-meal-update").value = alimento.categoria;
    document.getElementById("price-meal-update").value = alimento.precio;
    document.getElementById("status-meal-update").value = alimento.estatus;
    indexProductosSeleccionados = index;
}

function limpiarUpdate() {
    document.getElementById("name-meal-update").value = "";
    document.getElementById("description-meal-update").value = "";
    document.getElementById("category-meal-update").value = "0";
    document.getElementById("price-meal-update").value = "";
    document.getElementById("image-meal-update").value = "";
    document.getElementById("status-meal-update").value = "0";
}

function limpiarCreate() {
    document.getElementById("name-meal").value = "";
    document.getElementById("description-meal").value = "";
    document.getElementById("category-meal").value = "0";
    document.getElementById("price-meal").value = "";
    document.getElementById("image-meal").value = "";
}

function obtenerImagenBase64(file) {
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

async function modificarProducto() {
    let nombre = document.getElementById("name-meal-update").value;
    let descripcion = document.getElementById("description-meal-update").value;
    let categoria = document.getElementById("category-meal-update").value;
    let precio = document.getElementById("price-meal-update").value;
    let estatus = document.getElementById("status-meal-update").value;
    let imageMealUpdate = document.getElementById("image-meal-update");

    // Acceder al archivo seleccionado
    let file = imageMealUpdate.files[0];
    let foto = null;

    if (file) {
        try {
            // Convertir la imagen a base64
            foto = await obtenerImagenBase64(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    selectProducto(indexProductosSeleccionados);
    alimentos[indexProductosSeleccionados].nombre = nombre;
    alimentos[indexProductosSeleccionados].descripcion = descripcion;
    alimentos[indexProductosSeleccionados].precio = precio;
    alimentos[indexProductosSeleccionados].tipo = categoria;
    alimentos[indexProductosSeleccionados].estatus = estatus;
    alimentos[indexProductosSeleccionados].foto = foto || alimentos[indexProductosSeleccionados].foto;

    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}

async function agregarProducto() {
    let nombre = document.getElementById("name-meal").value;
    let descripcion = document.getElementById("description-meal").value;
    let categoria = document.getElementById("category-meal").value;
    let precio = document.getElementById("price-meal").value;
    let imageMealCreate = document.getElementById("image-meal");
    // Acceder al archivo seleccionado
    let file = imageMealCreate.files[0];
    let foto = null;

    if (file) {
        try {
            // Convertir la imagen a base64
            foto = await obtenerImagenBase64(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    console.log(nombre, descripcion, categoria, precio, foto);

    if (nombre && descripcion && categoria && precio && foto) {
        let newProd = {
            nombre,
            descripcion,
            precio,
            categoria,
            foto,
            estatus: "1"
        };
        alimentos.push(newProd);
        console.log(JSON.stringify(alimentos));
        limpiarCreate();
        actualizaTabla();
        console.log("Lo registré!");
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}

function obtenerImagenBase64(file) {
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

async function modificarProducto() {
    let nombre = document.getElementById("name-meal-update").value;
    let descripcion = document.getElementById("description-meal-update").value;
    let categoria = document.getElementById("category-meal-update").value;
    let precio = document.getElementById("price-meal-update").value;
    let estatus = document.getElementById("status-meal-update").value;
    let imageMealUpdate = document.getElementById("image-meal-update");

    // Acceder al archivo seleccionado
    let file = imageMealUpdate.files[0];
    let foto = null;

    if (file) {
        try {
            // Convertir la imagen a base64
            foto = await obtenerImagenBase64(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    selectProducto(indexProductosSeleccionados);
    alimentos[indexProductosSeleccionados].nombre = nombre;
    alimentos[indexProductosSeleccionados].descripcion = descripcion;
    alimentos[indexProductosSeleccionados].precio = precio;
    alimentos[indexProductosSeleccionados].tipo = categoria;
    alimentos[indexProductosSeleccionados].estatus = estatus;
    alimentos[indexProductosSeleccionados].foto = foto || alimentos[indexProductosSeleccionados].foto;

    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}

function eliminarProducto() {
    let nuevoArreglo = [];
    let elementoSeleccionado = alimentos[indexProductosSeleccionados];
    alimentos.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    alimentos = nuevoArreglo;
    limpiarUpdate();
    actualizaTabla();
}

// Cargar los datos y luego actualizar la tabla
cargarDatos().then(() => {
    actualizaTabla();
});
