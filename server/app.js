// Modules setup.
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// To make API calls.
app.use(cors());
// To send data in json format.
app.use(express.json());
// Not sending any form data.
app.use(express.urlencoded({ extended: false }));
