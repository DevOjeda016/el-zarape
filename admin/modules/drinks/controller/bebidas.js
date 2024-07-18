let obj = []; // Arreglo que se llenará de objetos JSON
let indexProductosSeleccionados;


fetch("http://127.0.0.1:5500/admin/modules/drinks/controller/bebidas.json")
    .then((response) => {
        return response.json();
    })
    .then(function (jasondata) {
        obj = jasondata;
        console.log(obj);
        actualizaTabla();
    });





function actualizaTabla() {
    let cuerpo = "";
    obj.forEach(function (elemento) {
        let registro = '<tr>' +
            '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal" onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
            '<td>' + Number(obj.indexOf(elemento) + 1) + '</td>' +
            '<td>' + elemento.nombre + '</td>' +
            '<td>' + elemento.descripcion + '</td>' +
            '<td>' + elemento.categoria + '</td>' +
            '<td>' + elemento.precio + '</td>' +
            '<td><img src="' + elemento.foto + '" width="100"></td>' +
            '<td>' + elemento.estatus + '</td>' +
            '</tr>';
        cuerpo += registro;
    });
    document.getElementById("table-bebida").innerHTML = cuerpo;
}
    


// Función para seleccionar un producto y llenar el modal de actualización
function selectProducto(index) {
    let producto = obj[index];
    document.getElementById("name-drink-update").value = producto.nombre;
    document.getElementById("description-drink-update").value = producto.descripcion;
    document.getElementById("category-drink-update").value = producto.categoria;
    document.getElementById("price-drink-update").value = producto.precio;
    document.getElementById("status-drink-update").value = producto.estatus;
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
        // generar un nuevo objeto y le asigno las variables locales
        let newProd = {}; // creamos un objeto
        newProd.nombre = nombre;
        newProd.descripcion = descripcion;
        newProd.precio = precio;
        newProd.categoria = categoria;
        newProd.foto = foto;
        newProd.estatus = "1";
        obj.push(newProd); // insertamos el nuevo producto al arreglo de objetos

        let jsonData = JSON.stringify(obj); // le asigno formato de comillas

        console.log(jsonData);
        console.log(typeof (jsonData));

        limpiarCreate();
        actualizaTabla();
        console.log("Lo registre!")
    } else {
        alert("Hay campos obligatorios para agregar el producto");
    }
}
/*
// selección del producto de acuerdo al índice del arreglo
// llena los campos del formulario
function selectProducto(index) {
    console.log(obj[index].categoria)
    document.getElementById("name").value = obj[index].nombre;
    document.getElementById("description").value = obj[index].descripcion;
    document.getElementById("price").value = obj[index].precio;
    //document.getElementById("catogory").value = obj[index].categoria;
    let elemento = document.getElementById('idDelElemento');
    if (elemento) {
        elemento.value = obj[index].categoria;
    }

    //document.getElementById("photo").src = ruta + obj.productos[index].foto;
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
        // generar un nuevo objeto y le asigno las variables locales
        let newProd = {}; // creamos un objeto
        newProd.nombre = nombre;
        newProd.descripcion = descripcion;
        newProd.precio = precio;
        newProd.tipo = tipo;
        newProd.foto = fotoNueva;
        newProd.estatus = "Activo";
        obj.productos.push(newProd); // insertamos el nuevo producto al arreglo de objetos

        let jsonData = JSON.stringify(obj.productos); // le asigno formato de comillas

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
    obj.productos[indexProductosSeleccionados].nombre = nombre;
    obj.productos[indexProductosSeleccionados].descripcion = descripcion;
    obj.productos[indexProductosSeleccionados].precio = precio;
    obj.productos[indexProductosSeleccionados].tipo = tipo;
    obj.productos[indexProductosSeleccionados].estatus = "Activo";
    obj.productos[indexProductosSeleccionados].foto = foto;
    actualizaTabla();
    selectProducto(indexProductosSeleccionados);
}

function eliminarProducto() {
    let nuevoArreglo = [];
    let elementoSeleccionado = obj.productos[indexProductosSeleccionados];
    obj.productos.forEach(function (elemento) {
        if (elemento != elementoSeleccionado) {
            nuevoArreglo.push(elemento);
        }
    });
    obj.productos = nuevoArreglo;
    limpiar();
    actualizaTabla();
}


//It iterate each object to show on table body
actualizaTabla();*/