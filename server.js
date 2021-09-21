const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        user:'root',
        host: 'localhost',
        password: '',
        database:'employee_db'
    },
    console.log('Created connecton to the employee database')
);