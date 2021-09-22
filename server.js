const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        user: 'root',
        host: 'localhost',
        password: '',
        database: 'employee_db'
    },
    console.log('Created connecton to the employee database')
);

beginPrompts();

function beginPrompts() {
    inquirer.prompt([
        {
            name: 'initialPrompts',
            type: 'list',
            message: 'Please select from the following options:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ]
        }
    ]).then(function (data) {
        if (data.initialPrompts === 'View All Departments') {
            viewDepts();
        } else if (data.initialPrompts === 'View All Roles') {
            viewRoles();
        } else if (data.initialPrompts === 'View All Employees') {
            viewEmps();
        } else if (data.initialPrompts === 'Add a Department') {
            addDept();
        } else if (data.initialPrompts === 'Add a Role') {
            addRole();
        } else if (data.initialPrompts === 'Add an Employee') {
            addEmp();
        } else if (data.initialPrompts === 'Update an Employee Role') {
            updateEmp();
        } else {
            console.log('Goodbye');
        }
    }).catch((err) => {
        console.log(err);
    })

};

function viewDepts() {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        beginPrompts();
    });
};

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        beginPrompts();

    });
};

function viewEmps() {
    db.query(`SELECT * FROM employee`, function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        beginPrompts();
    });
};

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please provide the name of the new department.'
        }
    ]).then(function (data) {
        db.query(`INSERT INTO department (name) VALUES (?)`, data.newDepartment, function (err, res){
            if (err) return console.log(err);
            console.table(res);
            beginPrompts();
        })
    })
}

function addRole() {
    db.query(`SELECT * FROM department`, function (err, departments) {
        if (err) return console.log(err);
    
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Please provide new role\'s title.'
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Please provide the salayr for this role.' 
            },
            {
                type: 'list',
                name: 'deptId',
                message: 'Please choose the department in which to add the new role.',
                choices: departments.map(department => 
                ({
                    name: department.name,
                    value: department.id    
                })
                )
            }            
        ]).then(function (data) {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [data.newRole, data.newSalary, data.deptId], function (err, res){
                if (err) return console.log(err);
                console.table(res);
                beginPrompts();
            })
        })
    });
    }
    