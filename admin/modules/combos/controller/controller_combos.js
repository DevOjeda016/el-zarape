document.addEventListener('DOMContentLoaded', function () {
    loadCombos();
    loadCatalogs();
});
let combos = [
    {
        id: 1,
        name: 'Combo Desayuno 1',
        price: 10.5,
        description: 'Tortas, Fruta, Café',
        alimentos: ['Tortas', 'Fruta'],
        bebidas: ['Café']
    },
    {
        id: 2,
        name: 'Combo Desayuno 2',
        price: 12,
        description: 'Chilaquiles, Jugo, Café',
        alimentos: ['Chilaquiles'],
        bebidas: ['Jugo', 'Café']
    },
    {
        id: 3,
        name: 'Combo Tacos al Vapor',
        price: 15,
        description: 'Tacos al Vapor, Refresco',
        alimentos: ['Tacos al Vapor'],
        bebidas: ['Refresco']
    },
    {
        id: 4,
        name: 'Combo Enchiladas Verdes',
        price: 13.5,
        description: 'Enchiladas Verdes, Agua de Horchata',
        alimentos: ['Enchiladas Verdes'],
        bebidas: ['Agua de Horchata']
    },
    {
        id: 5,
        name: 'Combo Pozole',
        price: 14,
        description: 'Pozole, Tostadas, Limonada',
        alimentos: ['Pozole', 'Tostadas'],
        bebidas: ['Limonada']
    },
    {
        id: 6,
        name: 'Combo Tamales',
        price: 11,
        description: 'Tamales, Atole',
        alimentos: ['Tamales'],
        bebidas: ['Atole']
    },
    {
        id: 7,
        name: 'Combo Barbacoa',
        price: 16,
        description: 'Barbacoa, Consomé, Agua de Jamaica',
        alimentos: ['Barbacoa', 'Consomé'],
        bebidas: ['Agua de Jamaica']
    },
    {
        id: 8,
        name: 'Combo Sopes',
        price: 12.5,
        description: 'Sopes, Agua de Tamarindo',
        alimentos: ['Sopes'],
        bebidas: ['Agua de Tamarindo']
    },
    {
        id: 9,
        name: 'Combo Molletes',
        price: 10,
        description: 'Molletes, Café',
        alimentos: ['Molletes'],
        bebidas: ['Café']
    },
    {
        id: 10,
        name: 'Combo Chiles Rellenos',
        price: 14.5,
        description: 'Chiles Rellenos, Horchata',
        alimentos: ['Chiles Rellenos'],
        bebidas: ['Agua de Horchata']
    }
];
// id
let nextId = combos.length > 0 ? Math.max(...combos.map(combo => combo.id)) + 1 : 1;
function loadCombos(combosToLoad = combos) {
    let tableBody = document.getElementById('combo-table-body');
    tableBody.innerHTML = '';
    combosToLoad.forEach(combo => {
        let row = `<tr onclick="editCombo(${combo.id})">
            <th scope="row">${combo.id}</th>
            <td>${combo.name}</td>
            <td>${combo.description}</td>
            <td>${combo.alimentos.join(', ')}</td>
            <td>${combo.bebidas.join(', ')}</td>
            <td>${combo.price}</td>
            <td><img src="${combo.image || 'default.png'}" alt="Imagen del Combo" width="100"></td>
            <td>${combo.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
function loadCatalogs() {
    let alimentos = ['Tortas', 'Fruta', 'Chilaquiles', 'Huevos', 'Tacos al Vapor', 'Enchiladas Verdes', 'Pozole', 'Tostadas', 'Tamales', 'Barbacoa', 'Consomé', 'Sopes', 'Molletes', 'Chiles Rellenos'];
    let bebidas = ['Café', 'Jugo', 'Agua', 'Té', 'Refresco', 'Agua de Horchata', 'Limonada', 'Atole', 'Agua de Jamaica', 'Agua de Tamarindo'];
 
    let alimentosSelect = document.getElementById('combo-alimentos');
    let bebidasSelect = document.getElementById('combo-bebidas');
    let updateAlimentosSelect = document.getElementById('update-combo-alimentos');
    let updateBebidasSelect = document.getElementById('update-combo-bebidas');
 
    alimentosSelect.innerHTML = '';
    bebidasSelect.innerHTML = '';
    updateAlimentosSelect.innerHTML = '';
    updateBebidasSelect.innerHTML = '';
 
    alimentos.forEach(alimento => {
        let option = `<option value="${alimento}">${alimento}</option>`;
        alimentosSelect.innerHTML += option;
        updateAlimentosSelect.innerHTML += option;
    });
 
    bebidas.forEach(bebida => {
        let option = `<option value="${bebida}">${bebida}</option>`;
        bebidasSelect.innerHTML += option;
        updateBebidasSelect.innerHTML += option;
    });
}
 
function createCombo() {
    let name = document.getElementById('combo-name').value;
    let price = document.getElementById('combo-price').value;
    let description = document.getElementById('combo-description').value;
    let alimentos = Array.from(document.getElementById('combo-alimentos').selectedOptions).map(option => option.value);
    let bebidas = Array.from(document.getElementById('combo-bebidas').selectedOptions).map(option => option.value);
    let image = document.getElementById('combo-image').files[0] ? URL.createObjectURL(document.getElementById('combo-image').files[0]) : '';
 
        if (!name || !price || !description || alimentos.length === 0 || bebidas.length === 0 || !document.getElementById('combo-image').files[0]) {
            alert('Por favor, llena todos los campos.');
            return;
        }
    let newCombo = {
        id: nextId++,
        name: name,
        price: parseFloat(price),
        description: description,
        alimentos: alimentos,
        bebidas: bebidas,
        image: image,
        status: 'Activo'
    };
 
    combos.push(newCombo);
    console.log('Nuevo combo creado:', newCombo);
    loadCombos();
    resetCreateForm();
    document.querySelector('#modal-create .btn-cancel').click();
}
 
function resetCreateForm() {
    document.getElementById('create-combo-form').reset();
}
 
function editCombo(id) {
    let combo = getComboById(id);
 
    document.getElementById('update-combo-id').value = combo.id;
    document.getElementById('update-combo-name').value = combo.name;
    document.getElementById('update-combo-price').value = combo.price;
    document.getElementById('update-combo-description').value = combo.description;
 
    let alimentosSelect = document.getElementById('update-combo-alimentos');
    let bebidasSelect = document.getElementById('update-combo-bebidas');
    let statusSelect = document.getElementById('update-combo-status');
 
    Array.from(alimentosSelect.options).forEach(option => {
        option.selected = combo.alimentos.includes(option.value);
    });
 
    Array.from(bebidasSelect.options).forEach(option => {
        option.selected = combo.bebidas.includes(option.value);
    });
 
    statusSelect.value = combo.status; // Establecer el estado actual del combo
 
    document.getElementById('update-combo-image').value = ''; 
 
    let modalUpdate = new bootstrap.Modal(document.getElementById('modal-update'));
    modalUpdate.show();
}
 
function updateCombo() {
    let id = parseInt(document.getElementById('update-combo-id').value);
    let name = document.getElementById('update-combo-name').value;
    let price = document.getElementById('update-combo-price').value;
    let description = document.getElementById('update-combo-description').value;
    let alimentos = Array.from(document.getElementById('update-combo-alimentos').selectedOptions).map(option => option.value);
    let bebidas = Array.from(document.getElementById('update-combo-bebidas').selectedOptions).map(option => option.value);
    let image = document.getElementById('update-combo-image').files[0] ? URL.createObjectURL(document.getElementById('update-combo-image').files[0]) : '';
 
    let status = document.getElementById('update-combo-status').value;
 
    if (!name || !price || !description || alimentos.length === 0 || bebidas.length === 0) {
        alert('Por favor, llena todos los campos.');
        return;
    }
 
    let updatedCombo = {
        id: id,
        name: name,
        price: parseFloat(price),
        description: description,
        alimentos: alimentos,
        bebidas: bebidas,
        image: image,
        status: status
    };
 
    let index = combos.findIndex(combo => combo.id === id);
    if (index !== -1) {
        combos[index] = updatedCombo;
        console.log('Combo actualizado:', updatedCombo);
        loadCombos();
        resetUpdateForm();
        document.querySelector('#modal-update .btn-cancel').click();
    }
}
 
function resetUpdateForm() {
    document.getElementById('update-combo-form').reset();
}
function prepareDeleteCombo(id) {
    let combo = getComboById(id);
    if (!combo) {
        console.error('Combo no encontrado');
        return;
    }
 
    let previewInfo = document.getElementById('preview-info');
    previewInfo.innerHTML = `
        <strong>ID:</strong> ${combo.id}<br>
        <strong>Nombre:</strong> ${combo.name}<br>
        <strong>Descripción:</strong> ${combo.description}<br>
        <strong>Alimentos:</strong> ${combo.alimentos.join(', ')}<br>
        <strong>Bebidas:</strong> ${combo.bebidas.join(', ')}<br>
        <strong>Precio:</strong> ${combo.price}<br>
        <strong>Imagen:</strong> <img src="${combo.image || 'default.png'}" alt="Imagen del Combo" width="100"><br>
        <strong>Status:</strong> ${combo.status}
    `;
 
    document.getElementById('confirm-delete-id').value = id;
 
    let modalPreview = new bootstrap.Modal(document.getElementById('modal-preview'));
    modalPreview.show();
}
 
function confirmDeleteCombo() {
    let id = parseInt(document.getElementById('confirm-delete-id').value);
    if (isNaN(id)) {
        console.error('ID del combo no válido');
        return;
    }
 
    let index = combos.findIndex(combo => combo.id === id);
    if (index !== -1) {
        combos.splice(index, 1);
        console.log('Combo eliminado:', id);
 
        // Reasignar IDs a los combos restantes
        for (let i = 0; i < combos.length; i++) {
            combos[i].id = i + 1;
        }
       
        nextId = combos.length + 1;
 
        loadCombos();
 
        // Ocultar el modal de vista previa
        let modalPreviewElement = document.getElementById('modal-preview');
        let modalPreview = bootstrap.Modal.getOrCreateInstance(modalPreviewElement);
        modalPreview.hide();
 
        // Limpiar el campo oculto
        document.getElementById('confirm-delete-id').value = '';
    } else {
        console.error('Combo no encontrado para eliminar');
    }
}
 
 
function getComboById(id) {
    return combos.find(combo => combo.id === id);
}
 
 
function deleteCombo() {
    let id = parseInt(document.getElementById('update-combo-id').value);
    prepareDeleteCombo(id);
}
 
function toggleSearchFields() {
    let searchFields = document.getElementById('search-fields');
    if (searchFields.style.display === 'none' || searchFields.style.display === '') {
        searchFields.style.display = 'block';
    } else {
        searchFields.style.display = 'none';
    }
}
 
function searchCombos() {
    let name = document.getElementById('search-name').value.toLowerCase();
    let alimentos = document.getElementById('search-alimentos').value.toLowerCase();
    let bebidas = document.getElementById('search-bebidas').value.toLowerCase();
 
    let filteredCombos = combos.filter(combo => {
        let nameMatch = combo.name.toLowerCase().includes(name);
        let alimentosMatch = alimentos === '' || combo.alimentos.some(alimento => alimento.toLowerCase().includes(alimentos));
        let bebidasMatch = bebidas === '' || combo.bebidas.some(bebida => bebida.toLowerCase().includes(bebidas));
        return nameMatch && alimentosMatch && bebidasMatch;
    });
 
    loadCombos(filteredCombos);
}