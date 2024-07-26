let users = []; // Arreglo que se llenará de bebidas JSON
let estatus = {};
let indexProductosSeleccionados;


    function cargarDatos() {
        return Promise.all([
            fetch("http://127.0.0.1:5500/admin/data/users.json")
                .then((response) => response.json())
                .then((data) => {
                    users = data;
                    console.log("Usuarios cargados:", users);
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
        let status;
    
        users.forEach(function (elemento) {
    
            for (let i = 0; i < estatus.length; i++) {
                if (estatus[i].id == elemento.status) {
                    status = estatus[i].status;
                    break;
                }
            }
    
            let registro = '<tr>' +
                '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal" onclick="selectProducto(' + users.indexOf(elemento) + ');">' +
                '<td>' + Number(users.indexOf(elemento) + 1) + '</td>' +
                '<td>' + elemento.name + '</td>' +
                '<td>' + elemento.lastname + '</td>' +
                '<td>' + elemento.phone + '</td>' +
                '<td>' + elemento.sucu + '</td>' +
                '<td>' + status + '</td>' +
                '<td>' + elemento.user + '</td>' +
                '</tr>';
            cuerpo += registro;
        });
        document.getElementById("table-users").innerHTML = cuerpo;
        console.log(cuerpo);
    }


    // Función para seleccionar un producto y llenar el modal de actualización
function selectProducto(index) {
    let usuarios = users[index];
    document.getElementById("name-update").value = usuarios.name;
    document.getElementById("lastname-update").value = usuarios.lastname;
    document.getElementById("phone-update").value = usuarios.phone;
    document.getElementById("sucu-update").value = usuarios.sucu;
    document.getElementById("status-update").value = usuarios.status;
    document.getElementById("user-update").value = usuarios.user;
    document.getElementById("password-update").value = usuarios.password;
    indexProductosSeleccionados = index;
}

function limpiarUpdate() {
    document.getElementById("name-update").value = "";
    document.getElementById("lastname-update").value = "";
    document.getElementById("phone-update").value = "";
    document.getElementById("sucu-update").value = "";
    document.getElementById("status-update").value = "0";
    document.getElementById("user-update").value = "";
    document.getElementById("password-update").value = "";
}

function limpiarCreate() {
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("sucu").value = "";
    document.getElementById("user").value = "";
    document.getElementById("password").value = "";
}


    cargarDatos().then(() => {
        actualizaTabla();
    });



    async function modificarProducto() {
        let nombre = document.getElementById("name-update").value;
        let apellido = document.getElementById("lastname-update").value;
        let telefono = document.getElementById("phone-update").value;
        let sucursal = document.getElementById("sucu-update").value;
        let estatus = document.getElementById("status-update").value;
        let usuario = document.getElementById("user-update").value;
        let contrasena = document.getElementById("password-update").value;
        
    
        
    
        selectProducto(indexProductosSeleccionados);
        users[indexProductosSeleccionados].name = nombre;
        users[indexProductosSeleccionados].lastname = apellido;
        users[indexProductosSeleccionados].phone = telefono;
        users[indexProductosSeleccionados].sucu = sucursal;
        users[indexProductosSeleccionados].status = estatus;
        users[indexProductosSeleccionados].user = usuario;
        users[indexProductosSeleccionados].password = contrasena;
    
        actualizaTabla();
        selectProducto(indexProductosSeleccionados);
    }
    
    async function agregarProducto() {
        let nombre = document.getElementById("name").value;
        let apellido = document.getElementById("lastname").value;
        let telefono = document.getElementById("phone").value;
        let sucursal = document.getElementById("sucu").value;
        let usuario = document.getElementById("user").value;
        let contrasena = document.getElementById("password").value;
    
        console.log(nombre, apellido, telefono, sucursal, estatus, usuario, contrasena);
    
        if (nombre && apellido && telefono && sucursal && usuario && contrasena) {
            let newProd = {
                nombre, 
                apellido, 
                telefono, 
                sucursal, 
                usuario, 
                contrasena,
                status: "1"
            };
            
            users.push(newProd);
            console.log(JSON.stringify(users));
            limpiarCreate();
            actualizaTabla();
            console.log("Lo registré!");
        } else {
            alert("Hay campos obligatorios para agregar el producto");
        }
    }
    

    
    async function modificarProducto() {
        let nombre = document.getElementById("name-update").value;
        let apellido = document.getElementById("lastname-update").value;
        let telefono = document.getElementById("phone-update").value;
        let sucursal = document.getElementById("sucu-update").value;
        let estatus = document.getElementById("status-update").value;
        let usuario = document.getElementById("user-update").value;
        let contrasena = document.getElementById("password-update").value;
        
    
        
    
        selectProducto(indexProductosSeleccionados);
        users[indexProductosSeleccionados].name = nombre;
        users[indexProductosSeleccionados].lastname = apellido;
        users[indexProductosSeleccionados].phone = telefono;
        users[indexProductosSeleccionados].sucu = sucursal;
        users[indexProductosSeleccionados].status = estatus;
        users[indexProductosSeleccionados].user = usuario;
        users[indexProductosSeleccionados].password = contrasena;
    
        actualizaTabla();
        selectProducto(indexProductosSeleccionados);
    }
    
    
    function eliminarProducto() {
        let nuevoArreglo = [];
        let elementoSeleccionado = users[indexProductosSeleccionados];
        users.forEach(function (elemento) {
            if (elemento != elementoSeleccionado) {
                nuevoArreglo.push(elemento);
            }
        });
        users = nuevoArreglo;
        limpiarUpdate();
        actualizaTabla();
    }
    
    // Cargar los datos y luego actualizar la tabla
    cargarDatos().then(() => {
        actualizaTabla();
    });