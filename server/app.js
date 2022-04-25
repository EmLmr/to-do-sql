// Modules setup.
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

const dbService = require('./dbService'); // imported, is an object

// To make API calls.
app.use(cors());
// To send data in json format.
app.use(express.json());
// Not sending any form data.
app.use(express.urlencoded({ extended: false }));

// CREATE.
app.post('/insert', (request, response) => {
    const task = request.body.task;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewTask(task);

    result.then((data) => response.json({ data: data })).catch((err) => console.log(err));
});

// READ.
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result.then((data) => response.json({ data: data })).catch((err) => console.log(err));
});

// DELETE.
app.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    result.then((data) => response.json({ success: data })).catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log('To-do app is running'));
