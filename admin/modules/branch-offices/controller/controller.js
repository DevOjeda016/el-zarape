document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.querySelector('.btn-agree');
    const cleanBtn = document.querySelector('.btn-clean');

    // Fetch products from JSON file
    fetch('../../../../admin/data/products.json') // Actualiza esta línea con la ruta correcta
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <th scope="row">${product.id}</th>
                    <td>${product.name}</td>
                    <td>${product.location}</td>
                    <td>${product.gps}</td>
                    <td><a href="${product.url}" target="_blank">${product.url}</a></td>
                    <td>${product.schedule}</td>
                `;
                document.querySelector('tbody').appendChild(newRow);

                // Add event listener to the new row
                newRow.addEventListener('click', () => {
                    openUpdateModal(newRow);
                });
            });
        });

    // Add event listeners to existing rows
    document.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            openUpdateModal(row);
        });
    });

    // Event listener for register button
    registerBtn.addEventListener('click', () => {
        const id = document.querySelector('#create-input-id').value;
        const name = document.querySelector('#create-input-name').value;
        const location = document.querySelector('#create-input-location').value;
        const gps = document.querySelector('#create-input-gps').value;
        const url = document.querySelector('#create-input-url').value;
        const schedule = document.querySelector('#create-input-schedule').value;
        const logoInput = document.querySelector('#create-input-logo');
        const logoFile = logoInput.files[0];
        let logoURL = '';

        // Validate that all fields are filled
        if (!id || !name || !location || !gps || !url || !schedule || !logoFile) {
            alert("Por favor, complete todos los campos y seleccione una imagen.");
            return;
        }

        // Create a new row
        const newRow = document.createElement('tr');
        const reader = new FileReader();
        reader.onload = (e) => {
            logoURL = e.target.result;

            newRow.innerHTML = `
                <th scope="row">${id}</th>
                <td>${name}</td>
                <td>${location}</td>
                <td>${gps}</td>
                <td><img src="${logoURL}" alt="${name} logo" class="row__image"></td>
                <td><a href="${url}" target="_blank">${url}</a></td>
                <td>${schedule}</td>
            `;
            document.querySelector('tbody').appendChild(newRow);

            // Add event listener to the new row
            newRow.addEventListener('click', () => {
                openUpdateModal(newRow);
            });

            // Reset form
            document.querySelector('#modal-create form').reset();
            document.querySelector('#modal-create').querySelector('[data-bs-dismiss="modal"]').click();  // Close modal
        };
        reader.readAsDataURL(logoFile);
    });

    // Event listener for clean button
    cleanBtn.addEventListener('click', () => {
        document.querySelector('#modal-create form').reset();
    });

    // Function to open the update modal and populate it with data
    function openUpdateModal(row) {
        const id = row.children[0].innerText;
        const name = row.children[1].innerText;
        const location = row.children[2].innerText;
        const gps = row.children[3].innerText;
        const url = row.children[4].children[0].href;
        const schedule = row.children[5].innerText;

        document.querySelector('#update-input-id').value = id;
        document.querySelector('#update-input-name').value = name;
        document.querySelector('#update-input-location').value = location;
        document.querySelector('#update-input-gps').value = gps;
        document.querySelector('#update-input-url').value = url;
        document.querySelector('#update-input-schedule').value = schedule;

        // Open the modal
        const updateModal = new bootstrap.Modal(document.getElementById('modal-update'));
        updateModal.show();
        
        // Store the row to delete or modify later
        document.querySelector('#modal-update').dataset.row = row.rowIndex;
    }

    // Event listener for modify button in the update modal
    document.querySelector('#modal-update .btn-modify').addEventListener('click', () => {
        const rowIndex = document.querySelector('#modal-update').dataset.row;
        const row = document.querySelector(`tbody tr:nth-child(${rowIndex})`);
        
        // Update the row with the new values
        row.children[0].innerText = document.querySelector('#update-input-id').value;
        row.children[1].innerText = document.querySelector('#update-input-name').value;
        row.children[2].innerText = document.querySelector('#update-input-location').value;
        row.children[3].innerText = document.querySelector('#update-input-gps').value;
        row.children[4].children[0].href = document.querySelector('#update-input-url').value;
        row.children[5].innerText = document.querySelector('#update-input-schedule').value;

        // Close the modal
        const updateModal = bootstrap.Modal.getInstance(document.getElementById('modal-update'));
        updateModal.hide();
    });

    // Event listener for delete button in the update modal
    document.querySelector('#modal-update .btn-delete').addEventListener('click', () => {
        const rowIndex = document.querySelector('#modal-update').dataset.row;
        const row = document.querySelector(`tbody tr:nth-child(${rowIndex})`);
        
        // Remove the row from the table
        row.remove();

        // Close the modal
        const updateModal = bootstrap.Modal.getInstance(document.getElementById('modal-update'));
        updateModal.hide();
    });

    // Event listener for clean button in the update modal
    document.querySelector('#modal-update .btn-clean').addEventListener('click', () => {
        document.querySelector('#update-form').reset();
    });
    
    // Event listener for cancel button in the update modal
    document.querySelector('#modal-update .btn-cancel').addEventListener('click', () => {
        document.querySelector('#update-form').reset();
    });
});
