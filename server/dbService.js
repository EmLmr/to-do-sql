const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// Establish connection with db, based off data set in db settings and .env file.
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
});

// Get feedback from connection status.
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        // console.log('db ' + connection.state);
    }
});

// Functions to get, update, insert or delete data.
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            // If query is successful, resolve it, otherwise reject it. Then show error.
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM tasks;';

                connection.query(query, (err, results) => {
                    // If error, create a new Error object and pass the error msg.
                    if (err) reject(new Error(err.message));
                    // else, pass results.
                    resolve(results);
                });
            });

            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
