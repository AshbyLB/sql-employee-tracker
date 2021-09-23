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
            updateRole();
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
    db.query(
        `SELECT employee.id,employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id FROM employee
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        JOIN role ON role.id = employee.role_id
        JOIN department ON role.department_id = department.id
        ORDER BY department_id`
        , function (err, res) {
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
        db.query(`INSERT INTO department (name) VALUES (?)`, data.newDepartment, function (err, res) {
            if (err) return console.log(err);
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
                message: 'Please provide the salary for this role.'
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
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [data.newRole, data.newSalary, data.deptId], function (err, res) {
                if (err) return console.log(err);
                console.table(res);
                beginPrompts();
            })
        })
    });
}

function addEmp() {
    db.query(`SELECT * FROM role`, function (err, newRole) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the new employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'list',
                name: 'newEmpRole',
                message: 'Please choose the role of the new employee.',
                choices: newRole.map(role =>
                ({
                    name: role.title,
                    value: role.id
                })
                )
            },
            {
                type: 'list',
                name: 'newMngr',
                message: 'Please choose the Manager of the new employee.',
                choices: [
                    {
                        name: 'Tommy Tickles',
                        value: 1
                    },
                    {
                        name: 'Randy Rockstar',
                        value: 2
                    },
                    {
                        name: 'Richard Soggybottom',
                        value: 3
                    },
                    {
                        name: 'Jesse Jawbreaker',
                        value: 4
                    }
                ]
            }
        ]).then(function (data) {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [data.firstName, data.lastName, data.newEmpRole, data.newMngr], function (err, res) {
                if (err) return console.log(err);
                beginPrompts();
            })
        })
    });
}

function updateRole() {
    db.query(`SELECT * FROM employee`, function (err, name) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                type: 'list',
                name: 'empName',
                message: 'Please choose the name of the employee you would like to change.',
                choices: name.map(nRole =>
                ({
                    name: nRole.first_name + " " + nRole.last_name,
                    value: nRole.id
                }))
            },
            {
                type: 'input',
                name: 'empId',
                message: 'Please enter the ID that corresponds with the new role',
            }
        ]).then(function (data) {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [data.empId, data.empName], function (err) {
                if (err) return console.log(err);
                beginPrompts();
            })
        })
    })
}