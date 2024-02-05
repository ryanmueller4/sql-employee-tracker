const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      // MySQL username
      user: 'root',
      // MySQL password
      password: 'Mx74-2nZo',
      database: 'employee_db',
    },
    console.log(`Connected to employee_db database.`)
);

const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, data) => {
    printTable(data);
    menu();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, data) => {
    printTable(data);
    menu();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, data) => {
    printTable(data);
    menu();
  });
};

const menu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee'],
      }
    ])
    .then((data) => {
      if (data.options === 'View All Departments') {
        viewDepartments();
      } else if (data.options === 'View All Roles') {
        viewRoles();
      } else if (data.options === 'View All Employees') {
        viewEmployees(); 
      } else if (data.options === 'Add Department') {
        addDepartment();
      } else if (data.options === 'Add Role') {
        addRole();
      } else if (data.options === 'Add Employee') {
        addEmployee();
      } else if (data.options === 'Update Employee') {
        updateEmployee();
      }
    });
};

menu()
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role