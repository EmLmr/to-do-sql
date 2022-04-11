document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        // Convert response into json:
        .then((response) => response.json())
        // Logging the data received in json format:
        .then((data) => loadHTMLtable(data['data'])); // data object and key from the result variable in app.js
});

function loadHTMLtable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) table.innerHTML = '<tr><td class="no-data" colspan="5">No data</tr></td>';
}
