let obj = []; // Arreglo que se llenara de objetos JSON
let indexProductosSeleccionados;

console.log(obj);

fetch("http://127.0.0.1:5500/admin/modules/users/controller/users.json")
    .then((response) => {
        return response.json();
    })
    .then(function (jasondata) {
        obj = jasondata;
        console.log(obj);
        actualizaTabla();
    });

function actualizaTabla(){
    let cuerpo = "";
    console.log(obj,cuerpo);
    obj.forEach(function(elemento) {
        let registro = '<tr>' +
        '<tr class="table-row" data-bs-target="#modal-update" data-bs-toggle="modal" onclick="selectProducto(' + obj.indexOf(elemento) + ');">' +
        '<td>' + Number(obj.indexOf(elemento) + 1) + '</td>' +
        '<td>' + elemento.name + '</td>' +
        '<td>' + elemento.lastname + '</td>' +
        '<td>' + elemento.phone + '</td>' +
        '<td>'+ elemento.sucu + '</td>' +
        '<td>' + elemento.status + '</td>' +
        '<td>' + elemento.user + '</td>' +
        '<td>' + elemento.password + '</td>' +
        '</tr>';
        cuerpo += registro;
        console.log(cuerpo)
    });
    console.log(cuerpo)
    document.getElementById("table-users").innerHTML = cuerpo;
}
actualizaTabla();