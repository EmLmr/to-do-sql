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

    // READ
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

    // CREATE
    async insertNewTask(task) {
        try {
            const dateAdded = new Date();
            // If query is successful, resolve it, otherwise reject it. Then show error.
            const insertId = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO  tasks (task, date_added) VALUES (?,?);';

                connection.query(query, [task, dateAdded], (err, result) => {
                    // If error, create a new Error object and pass the error msg.
                    if (err) reject(new Error(err.message));
                    // else, pass results.
                    resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                task: task,
                dateAdded: dateAdded,
            };
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); // some browsers need base 10 to be specified

            // If query is successful, resolve it, otherwise reject it. Then show error.
            const response = await new Promise((resolve, reject) => {
                const query = 'DELETE FROM tasks WHERE id = ?;';

                connection.query(query, [id], (err, result) => {
                    // If error, create a new Error object and pass the error msg.
                    if (err) reject(new Error(err.message));
                    // else, pass results.
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // UPDATE
    async updateTaskById(id, task) {
        try {
            id = parseInt(id, 10); // some browsers need base 10 to be specified

            // If query is successful, resolve it, otherwise reject it. Then show error.
            const response = await new Promise((resolve, reject) => {
                const query = 'UPDATE tasks SET task = ? WHERE id = ?;';

                connection.query(query, [task, id], (err, result) => {
                    // If error, create a new Error object and pass the error msg.
                    if (err) reject(new Error(err.message));
                    // else, pass results.
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;
