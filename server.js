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

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter name of new department:',
        name: 'dept_name',
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO department (dept_name)
      VALUES ("${data.dept_name}")`, err => {
        viewDepartments()
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter name of new role:',
        name: 'title',
      },
      {
        type: 'input',
        message: 'Enter salary of new role:',
        name: 'salary',
      },
      {
        type: 'input',
        message: 'Enter department id:',
        name: 'department_id',
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO role (title, salary, department_id)
      VALUES ("${data.title}", "${data.salary}", "${data.department_id}")`, err => {
        viewRoles()
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter first name:',
        name: 'firstName',
      },
      {
        type: 'input',
        message: 'Enter last name:',
        name: 'lastName'
      },
      {
        type: 'input',
        message: 'Enter role id:',
        name: 'role_id',
      },
      {
        type: 'input',
        message: 'Enter manager id:',
        name: 'manager_id',
      }
    ])
    .then((data) => {
      if (data.manager_id) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${data.firstName}", "${data.lastName}", "${data.role_id}", "${data.manager_id}")`, err => {
          viewEmployees()
        });
      } else {
        db.query(`INSERT INTO employee (first_name, last_name, role_id)
        VALUES ("${data.firstName}", "${data.lastName}", "${data.role_id}")`, err => {
          viewEmployees()
        });
      }
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter employee id:',
        name: 'employee_id',
      },
      {
        type: 'list',
        message: 'What would you like to update?',
        name: 'updateOptions',
        choices: ['First name', 'Last name', 'Employee Role', 'Manager'],
      }
    ])
    .then((data) => {
      const employeeId = data.employee_id;
      if (data.updateOptions === 'First name') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter new first name:',
              name: 'updatedFirst',
            }
          ])
          .then((firstName) => {
            db.query(`UPDATE employee SET first_name = "${firstName.updatedFirst}" WHERE id = "${employeeId}"`, err => {
              viewEmployees()
            })
          })
      } else if (data.updateOptions === 'Last name') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter new last name:',
              name: 'updatedLast',
            }
          ])
          .then((lastName) => {
            db.query(`UPDATE employee SET last_name = ${lastName.updatedLast} WHERE id = ${data.employee_id}`, err => {
              viewEmployees()
            })
          })
      } else if (data.updateOptions === 'Employee Role') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter new role id:',
              name: 'updatedRole',
            }
          ])
          .then((employeeRole) => {
            db.query(`UPDATE employee SET role_id = ${employeeRole.updatedRole} WHERE id = ${data.employee_id}`, err => {
              viewEmployees()
            })
          })
        }
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