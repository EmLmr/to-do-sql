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

// READ.
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    result.then((data) => response.json({ data: data })).catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log('To-do app is running'));
