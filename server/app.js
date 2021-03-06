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

// UPDATE.
app.patch('/update', (request, response) => {
    const { id, task } = request.body; // destructuring of request.body.id/nqme for shorter code
    const db = dbService.getDbServiceInstance();

    const result = db.updateTaskById(id, task);
    result.then((data) => response.json({ success: data })).catch((err) => console.log(err));
});

// DELETE.
app.delete('/delete/:id', (request, response) => {
    const id = request.params.id;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    result.then((data) => response.json({ success: data })).catch((err) => console.log(err));
});

// Search.
app.get('/search/:task', (request, response) => {
    const task = request.params.task;
    const db = dbService.getDbServiceInstance();

    const result = db.searchTask(task);
    result.then((data) => response.json({ data: data })).catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log('To-do app is running'));
