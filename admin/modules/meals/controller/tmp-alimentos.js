let alimentos = []; // Arreglo que se llenará de alimentos objetos JSON
let categorias = {};
let estatus = {};
let indexProductosSeleccionados;

function cargarDatos() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/alimentos.json")
            .then((response) => response.json())
            .then((data) => {
                alimentos = data;
                console.log("Alimentos cargados:", alimentos);
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
    if (!alimentos.length || !categorias.alimentos || !estatus.length) {
        console.log("Datos aún no cargados completamente.");
        return;
    }

    let cuerpo = "";
    let categoria;
    let status;

    alimentos.forEach(function (elemento) {
        console.log(categorias["alimentos"]);
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
            '<td><img src="' + elemento.foto + '" width="100"></td>' +
            '<td>' + status + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-alimento").innerHTML = cuerpo;
}

// Función para seleccionar un producto y llenar el modal de actualización
function selectProducto(index) {
    let producto = alimentos[index];
    document.getElementById("name-meal-update").value = producto.nombre;
    document.getElementById("description-meal-update").value = producto.descripcion;
    document.getElementById("category-meal-update").value = producto.categoria;
    document.getElementById("price-meal-update").value = producto.precio;
    document.getElementById("status-meal-update").value = producto.estatus;
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

function obtenerNombreFoto() {
    let nombreFoto = document.getElementById("image-meal").value;
    nombreFoto = nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
    return nombreFoto;
}

function agregarProducto() {
    let nombre = document.getElementById("name-meal").value;
    let descripcion = document.getElementById("description-meal").value;
    let categoria = document.getElementById("category-meal").value;
    let precio = document.getElementById("price-meal").value;
    let foto = obtenerNombreFoto();

    if (nombre && descripcion && precio && foto) {
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
        console.log("Producto registrado!");
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}

function modificarProducto() {
    let nombre = document.getElementById("name-meal-update").value;
    let descripcion = document.getElementById("description-meal-update").value;
    let categoria = document.getElementById("category-meal-update").value;
    let precio = document.getElementById("price-meal-update").value;
    let estatus = document.getElementById("status-meal-update").value;
    let foto = obtenerNombreFoto();

    alimentos[indexProductosSeleccionados] = {
        ...alimentos[indexProductosSeleccionados],
        nombre,
        descripcion,
        precio,
        categoria,
        estatus,
        foto
    };
    actualizaTabla();
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
    console.log("Producto eliminado");
    actualizaTabla();
}

// Cargar los datos y luego actualizar la tabla
cargarDatos().then(() => {
    actualizaTabla();
});