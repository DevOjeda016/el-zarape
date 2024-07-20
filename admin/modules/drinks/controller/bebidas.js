let bebidas = []; // Arreglo que se llenará de bebidas JSON
let categorias = {};
let estatus = {};
let indexProductosSeleccionados;

function cargarDatos() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/bebidas.json")
            .then((response) => response.json())
            .then((data) => {
                bebidas = data;
                console.log("Bebidas cargadas:", bebidas);
            }),
        fetch("http://127.0.0.1:5500/admin/data/categorias.json")
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

    bebidas.forEach(function (elemento) {
        for (let i = 0; i < categorias["bebidas"].length; i++) {
            if (categorias["bebidas"][i].id == elemento.categoria) {
                categoria = categorias["bebidas"][i].categoria;
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
            '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal" onclick="selectProducto(' + bebidas.indexOf(elemento) + ');">' +
            '<td>' + Number(bebidas.indexOf(elemento) + 1) + '</td>' +
            '<td>' + elemento.nombre + '</td>' +
            '<td>' + elemento.descripcion + '</td>' +
            '<td>' + categoria + '</td>' +
            '<td>' + elemento.precio + '</td>' +
            '<td><img src="' + elemento.foto + '" width="100"></td>' +
            '<td>' + status + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-bebida").innerHTML = cuerpo;
}

// Función para seleccionar un producto y llenar el modal de actualización
function selectProducto(index) {
    let bebida = bebidas[index];
    document.getElementById("name-drink-update").value = bebida.nombre;
    document.getElementById("description-drink-update").value = bebida.descripcion;
    document.getElementById("category-drink-update").value = bebida.categoria;
    document.getElementById("price-drink-update").value = bebida.precio;
    document.getElementById("status-drink-update").value = bebida.estatus;
    indexProductosSeleccionados = index;
}

function limpiarUpdate() {
    document.getElementById("name-drink-update").value = "";
    document.getElementById("description-drink-update").value = "";
    document.getElementById("category-drink-update").value = "0";
    document.getElementById("price-drink-update").value = "";
    document.getElementById("image-drink-update").value = "";
    document.getElementById("status-drink-update").value = "0";
}

function limpiarCreate() {
    document.getElementById("name-drink").value = "";
    document.getElementById("description-drink").value = "";
    document.getElementById("category-drink").value = "0";
    document.getElementById("price-drink").value = "";
    document.getElementById("image-drink").value = "";
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
    let nombre = document.getElementById("name-drink-update").value;
    let descripcion = document.getElementById("description-drink-update").value;
    let categoria = document.getElementById("category-drink-update").value;
    let precio = document.getElementById("price-drink-update").value;
    let estatus = document.getElementById("status-drink-update").value;
    let imageDrinkUpdate = document.getElementById("image-drink-update");

    // Acceder al archivo seleccionado
    let file = imageDrinkUpdate.files[0];
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
    bebidas[indexProductosSeleccionados].nombre = nombre;
    bebidas[indexProductosSeleccionados].descripcion = descripcion;
    bebidas[indexProductosSeleccionados].precio = precio;
    bebidas[indexProductosSeleccionados].tipo = categoria;
    bebidas[indexProductosSeleccionados].estatus = estatus;
    bebidas[indexProductosSeleccionados].foto = foto || bebidas[indexProductosSeleccionados].foto;

    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}


async function agregarProducto() {
    let nombre = document.getElementById("name-drink").value;
    let descripcion = document.getElementById("description-drink").value;
    let categoria = document.getElementById("category-drink").value;
    let precio = document.getElementById("price-drink").value;
    let imageDrinkCreate = document.getElementById("image-drink");
    // Acceder al archivo seleccionado
    let file = imageDrinkCreate.files[0];
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
        bebidas.push(newProd);
        console.log(JSON.stringify(bebidas));
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
    let nombre = document.getElementById("name-drink-update").value;
    let descripcion = document.getElementById("description-drink-update").value;
    let categoria = document.getElementById("category-drink-update").value;
    let precio = document.getElementById("price-drink-update").value;
    let estatus = document.getElementById("status-drink-update").value;
    let imageDrinkUpdate = document.getElementById("image-drink-update");

    // Acceder al archivo seleccionado
    let file = imageDrinkUpdate.files[0];
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
    bebidas[indexProductosSeleccionados].nombre = nombre;
    bebidas[indexProductosSeleccionados].descripcion = descripcion;
    bebidas[indexProductosSeleccionados].precio = precio;
    bebidas[indexProductosSeleccionados].tipo = categoria;
    bebidas[indexProductosSeleccionados].estatus = estatus;
    bebidas[indexProductosSeleccionados].foto = foto || bebidas[indexProductosSeleccionados].foto;

    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}


function eliminarProducto() {
    let nuevoArreglo = [];
    let elementoSeleccionado = bebidas[indexProductosSeleccionados];
    bebidas.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    bebidas = nuevoArreglo;
    limpiarUpdate();
    actualizaTabla();
}

// Cargar los datos y luego actualizar la tabla
cargarDatos().then(() => {
    actualizaTabla();
});
