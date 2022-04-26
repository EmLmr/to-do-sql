document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        // Convert response into json:
        .then((response) => response.json())
        // Logging the data received in json format:
        .then((data) => loadHTMLtable(data['data'])); // data object and key from the result variable in app.js
});

// Add event listeners to Delete and Edit buttons.
document.querySelector('table tbody').addEventListener('click', function (event) {
    console.log(event.target);

    // Delete.
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id);
    }
    // Update.
    if (event.target.className === 'edit-row-btn') {
        handleEditRow(event.target.dataset.id);
    }
});

// Search function.
const searchBtn = document.getElementById('search-btn');

searchBtn.onclick = function () {
    const searchValue = document.getElementById('search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
        // Convert response into json:
        .then((response) => response.json())
        // Logging the data received in json format:
        .then((data) => loadHTMLtable(data['data'])); // data object and key from the result variable in app.js

    // Display "Show all" button
    const showAllBtn = document.getElementById('show-all-btn');
    showAllBtn.hidden = false;
    //  Refresh page to show all tasks.
    showAllBtn.onclick = function () {
        location.reload();
    };
};

// DELETE data.
function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.reload();
            }
        });
}

// UPDATE data.
const updateBtn = document.getElementById('update-row-btn');

function handleEditRow(id) {
    const updateSection = document.getElementById('update-row');
    updateSection.hidden = false;
    // Mirror task id in button.
    document.getElementById('update-task-input').dataset.id = id;
}

updateBtn.onclick = function () {
    const updateTaskInput = document.getElementById('update-task-input');
    fetch('http://localhost:5000/update', {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
            id: updateTaskInput.dataset.id,
            task: updateTaskInput.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.reload();
            }
        });
};

// CREATE data.
const addBtn = document.getElementById('add-task-btn');

addBtn.onclick = function () {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value;
    taskInput.value = '';

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ task: task }),
    })
        .then((response) => response.json())
        .then((data) => insertRowIntoTable(data['data']));
};

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const tableHasData = table.querySelector('no-data');

    let tableHtml = '<tr>';

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
    tableHtml += '</tr>';

    if (tableHasData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

// READ data.
function loadHTMLtable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = '<tr><td class="no-data" colspan="5">No data</tr></td>';
    }

    let tableHtml = '';

    // Row format for each new task.
    data.forEach(function ({ id, task, date_added }) {
        tableHtml += '<tr>';
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${task}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHtml += '</tr>';
    });

    table.innerHTML = tableHtml;
}
