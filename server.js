const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        user:'root',
        host: 'localhost',
        password: '',
        database:'employee_db'
    },
    console.log('Created connecton to the employee database')
);
function beginPrompts() {
    inquirer.prompt([
        {
            name: 'initialPrompts',
            type: 'rawlist',
            message: 'Please select from theh following options:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ])
}
db.query(`SELECT * FROM`, function (err, results) {
    if (err) return console.log(err);
     console.log(res.json(results));
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});