let bebidas = []; // Arreglo que se llenará de bebidasetos JSON
let categorias = [];
let estatus = [];
let indexProductosSeleccionados;


fetch("http://127.0.0.1:5500/admin/data/bebidas.json")
    .then((response) => {
        return response.json();
    })
    .then(function (jasondata) {
        bebidas = jasondata;
        console.log(typeof bebidas, bebidas);
        actualizaTabla();
    });

fetch("http://127.0.0.1:5500/admin/data/categorias.json")
    .then((response) => {
        return response.json();
    })
    .then(function (jasondata) {
        categorias = jasondata;
        console.log(typeof categorias, categorias);
        actualizaTabla();
    });

fetch("http://127.0.0.1:5500/admin/data/status.json")
    .then((response) => {
        return response.json();
    })
    .then(function (jasondata) {
        estatus = jasondata;
        console.log(typeof estatus, estatus);
        actualizaTabla();
    });



function actualizaTabla() {
    let cuerpo = "";
    let  categoria;
    let status;
    bebidas.forEach(function (elemento) {
        for (let i = 0; i < categorias.length; i++) {
            if(categorias[i].id == elemento.categoria) {
                categoria = categorias[i].categoria;
                break;
            }
        }

        for (let i = 0; i < estatus.length; i++) {
            if(estatus[i].id == elemento.estatus) {
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
    let producto = bebidas[index];
    document.getElementById("name-drink-update").value = producto.nombre;
    document.getElementById("description-drink-update").value = producto.descripcion;
    document.getElementById("category-drink-update").value = producto.categoria;
    document.getElementById("price-drink-update").value = producto.precio;
    document.getElementById("status-drink-update").value = producto.estatus;
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


function obtenerNombreFoto() {
    let nombreFoto;
    nombreFoto = document.getElementById("image-drink").value;
    nombreFoto = nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
    return nombreFoto;
}


function agregarProducto() {
    let nombre, descripcion, precio, categoria;
    // tomar los datos del formulario en variables locales
    nombre = document.getElementById("name-drink").value;
    descripcion = document.getElementById("description-drink").value;
    categoria = document.getElementById("category-drink").value;
    precio = document.getElementById("price-drink").value;
    foto = obtenerNombreFoto();


    if (nombre != "" && descripcion != "" && precio != "" && foto != "") {
        // generar un nuevo bebidaseto y le asigno las variables locales
        let newProd = {}; // creamos un bebidaseto
        newProd.nombre = nombre;
        newProd.descripcion = descripcion;
        newProd.precio = precio;
        newProd.categoria = categoria;
        newProd.foto = foto;
        newProd.estatus = "1";
        bebidas.push(newProd); // insertamos el nuevo producto al arreglo de bebidasetos

        let jsonData = JSON.stringify(bebidas); // le asigno formato de comillas

        console.log(jsonData);
        console.log(typeof (jsonData));

        limpiarCreate();
        actualizaTabla();
        console.log("Lo registre!")
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}


function modificarProducto() {
    let nombre, descripcion, precio, categoria;
    // tomar los datos del formulario en variables locales
    nombre = document.getElementById("name-drink-update").value;
    descripcion = document.getElementById("description-drink-update").value;
    categoria = document.getElementById("category-drink-update").value;
    precio = document.getElementById("price-drink-update").value;
    estatus = document.getElementById("status-drink-update").value;
    foto = obtenerNombreFoto();

    selectProducto(indexProductosSeleccionados);
    bebidas[indexProductosSeleccionados].nombre = nombre;
    bebidas[indexProductosSeleccionados].descripcion = descripcion;
    bebidas[indexProductosSeleccionados].precio = precio;
    bebidas[indexProductosSeleccionados].tipo = categoria;
    bebidas[indexProductosSeleccionados].estatus = "Activo";
    bebidas[indexProductosSeleccionados].foto = foto;
    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}


function eliminarProducto() {
    let nuevoArreglo = [];
    let elementoSeleccionado = bebidas.productos[indexProductosSeleccionados];
    bebidas.productos.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    bebidas.productos = nuevoArreglo;
    limpiar();
    actualizaTabla();
}

/*
// selección del producto de acuerdo al índice del arreglo
// llena los campos del formulario
function selectProducto(index) {
    console.log(bebidas[index].categoria)
    document.getElementById("name").value = bebidas[index].nombre;
    document.getElementById("description").value = bebidas[index].descripcion;
    document.getElementById("price").value = bebidas[index].precio;
    //document.getElementById("catogory").value = bebidas[index].categoria;
    let elemento = document.getElementById('idDelElemento');
    if (elemento) {
        elemento.value = bebidas[index].categoria;
    }

    //document.getElementById("photo").src = ruta + bebidas.productos[index].foto;
    //document.getElementById("txtFotoRuta").value = "";
    indexProductosSeleccionados = index;
}

actualizaTabla();

function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtFoto").src = "img/nada.jpg";
    document.getElementById("txtFotoRuta").value = "";
}


function obtenerNombreFoto() {
    let nombreFoto;
    nombreFoto = document.getElementById("txtFotoRuta").value;
    nombreFoto = nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
    return nombreFoto;
}




function agregarProducto() {
    let nombre, descripcion, precio, tipo;
    // tomar los datos del formulario en variables locales
    nombre = document.getElementById("txtNombre").value;
    descripcion = document.getElementById("txtDescripcion").value;
    precio = document.getElementById("txtPrecio").value;
    tipo = document.getElementById("txtTipo").value;
    foto = obtenerNombreFoto();
    fotoNueva = obtenerNombreFoto();


    if (nombre != "" && descripcion != "" && precio != "" && tipo != "" && foto != "" && fotoNueva != "") {
        // generar un nuevo bebidaseto y le asigno las variables locales
        let newProd = {}; // creamos un bebidaseto
        newProd.nombre = nombre;
        newProd.descripcion = descripcion;
        newProd.precio = precio;
        newProd.tipo = tipo;
        newProd.foto = fotoNueva;
        newProd.estatus = "Activo";
        bebidas.productos.push(newProd); // insertamos el nuevo producto al arreglo de bebidasetos

        let jsonData = JSON.stringify(bebidas.productos); // le asigno formato de comillas

        console.log(jsonData);
        console.log(typeof (jsonData));

        limpiar();
        actualizaTabla();
    } else {
        alert("Hay campos obligatorios para agregar el producto")
    }
}

function modificarProducto() {

    // tomar los datos del formulario en variables locales
    let nombre = document.getElementById("txtNombre").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = document.getElementById("txtPrecio").value;
    let tipo = document.getElementById("txtTipo").value;
    let foto = obtenerNombreFoto()

    selectProducto(indexProductosSeleccionados);
    bebidas.productos[indexProductosSeleccionados].nombre = nombre;
    bebidas.productos[indexProductosSeleccionados].descripcion = descripcion;
    bebidas.productos[indexProductosSeleccionados].precio = precio;
    bebidas.productos[indexProductosSeleccionados].tipo = tipo;
    bebidas.productos[indexProductosSeleccionados].estatus = "Activo";
    bebidas.productos[indexProductosSeleccionados].foto = foto;
    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}

function eliminarProducto() {
    let nuevoArreglo = [];
    let elementoSeleccionado = bebidas.productos[indexProductosSeleccionados];
    bebidas.productos.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    bebidas.productos = nuevoArreglo;
    limpiar();
    actualizaTabla();
}


//It iterate each bebidasect to show on table body
actualizaTabla();*/