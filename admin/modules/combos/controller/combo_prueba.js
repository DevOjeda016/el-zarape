let alimentos = [];
let bebidas = [];
let combos2 = [];

function cargarDatos() {
    return Promise.all([
        fetch("http://127.0.0.1:5500/admin/data/alimentos.json")
            .then(response => response.json())
            .then(data => {
                alimentos = data;
                console.log("Alimentos cargados:", alimentos);
                llenarSelectsAlimentos();
            }),
        fetch("http://127.0.0.1:5500/admin/data/bebidas.json")
            .then(response => response.json())
            .then(data => {
                bebidas = data;
                console.log("Bebidas cargadas:", bebidas);
                llenarSelectsBebidas();
            }),
        fetch("http://127.0.0.1:5500/admin/data/combos2.json")
            .then(response => response.json())
            .then(data => {
                combos2 = data;
                console.log("Combos cargados:", combos2);
                llenarTablaCombos();
            })
    ]);
}

function llenarSelectsAlimentos() {
    const selectCreate = document.getElementById('combo-alimentos');
    const selectUpdate = document.getElementById('update-combo-alimentos');

    const defaultOption = '<option value="0" disabled selected>Seleccione una opción...</option>';
    selectCreate.innerHTML = defaultOption;
    selectUpdate.innerHTML = defaultOption;

    alimentos.forEach(alimento => {
        const option = document.createElement('option');
        option.value = alimento.nombre;
        option.textContent = alimento.nombre;
        
        selectCreate.appendChild(option.cloneNode(true));
        selectUpdate.appendChild(option.cloneNode(true));
    });
}

function llenarSelectsBebidas() {
    const selectCreate = document.getElementById('combo-bebidas-container');
    if (!selectCreate) {
        console.error("Contenedor de bebidas no encontrado.");
        return;
    }

    selectCreate.innerHTML = '';

    bebidas.forEach(bebida => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = bebida.nombre;
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(bebida.nombre));
        selectCreate.appendChild(label);
    });
}

function llenarTablaCombos() {
    const tbody = document.getElementById('combo-table-body');

    tbody.innerHTML = '';

    combos2.forEach((combo, index) => {
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;

        const tdNombre = document.createElement('td');
        tdNombre.textContent = combo.nombre;

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = combo.descripcion;

        const tdAlimento = document.createElement('td');
        tdAlimento.textContent = combo.alimento || 'N/A';

        const tdBebida = document.createElement('td');
        tdBebida.textContent = combo.bebida || 'N/A';

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${combo.precio.toFixed(2)}`;

        const tdImagen = document.createElement('td');
        const img = document.createElement('img');
        img.className = 'table__item-img'; 
        img.src = combo.foto.startsWith('data:') ? combo.foto : `../../../../assets/css/img/combos/${combo.foto}`;
        img.alt = combo.nombre;
        img.style.width = '100px'; 
        tdImagen.appendChild(img);

        const tdEstatus = document.createElement('td');
        tdEstatus.textContent = combo.estatus === '1' ? 'Activo' : 'Inactivo';

        tr.appendChild(tdIndex);
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdAlimento);
        tr.appendChild(tdBebida);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdImagen);
        tr.appendChild(tdEstatus);

        tbody.appendChild(tr);
    });
}

function obtenerImagenBase64(file) {
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

function validarCampos() {
    const nombre = document.getElementById('combo-name').value;
    const descripcion = document.getElementById('combo-description').value;
    const alimento = document.getElementById('combo-alimentos').value;
    const precio = document.getElementById('combo-price').value;
    const fileInput = document.getElementById('combo-image');
    
    if (!nombre || !descripcion || alimento === "0" || !precio || !fileInput.files.length) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    return true;
}

async function createCombo() {
    if (!validarCampos()) {
        return;
    }

    const nombre = document.getElementById('combo-name').value;
    const descripcion = document.getElementById('combo-description').value;
    const alimento = document.getElementById('combo-alimentos').value;
    
    const bebidasSeleccionadas = Array.from(document.querySelectorAll('#combo-bebidas-container input:checked'))
        .map(checkbox => checkbox.value);
    
    const precio = parseFloat(document.getElementById('combo-price').value);
    const fileInput = document.getElementById('combo-image');
    const file = fileInput.files[0];
    let foto = '';

    if (file) {
        try {
            foto = await obtenerImagenBase64(file);
        } catch (error) {
            console.error('Error al obtener la imagen en base64:', error);
        }
    }

    const nuevoCombo = {
        nombre,
        descripcion,
        alimento,
        bebida: bebidasSeleccionadas.join(', '), 
        precio,
        foto,
        estatus: 'Activo' 
    };

    combos2.push(nuevoCombo);
    llenarTablaCombos();
    resetCreateForm();
    $('#modal-create').modal('hide'); // Cierra el modal después de registrar
}

function resetCreateForm() {
    document.getElementById('create-combo-form').reset();
    document.querySelectorAll('#combo-bebidas-container input:checked').forEach(checkbox => {
        checkbox.checked = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos().then(() => {
        console.log("Datos cargados");
    });
});
