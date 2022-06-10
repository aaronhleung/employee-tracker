const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/index');
const {prompt} = require("inquirer");
const connection = require('./db/connection');


init();

function init() {
    startPrompt();
}

function startPrompt() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "Please select an option",
                choices: ["View employees", "Add employee", "Update employee role", "View departments", "Add department", "View roles", "Add role", "Exit program"],
            }
        ])
        .then(res => {
            switch (res.choice) {
                case "View employees":
                    viewEmployees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "View departments":
                    viewDepartments();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "Add role":
                    addRole();
                    break;
                default:
                    process.exit();
            }
        }
    )
}


function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startPrompt());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startPrompt());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startPrompt());
}

function addEmployee() {
  inquirer
      .prompt([
          {
              name: "first_name",
              type: "input",
              message: "What is the first name of the new employee?",
          },
          {
              name: "last_name",
              type: "input",
              message: "What is the last name of the new employee?",
          },
          {
              name: "role",
              type: "input",
              message: "What is the new employee's role ID?",
          },
          {
              name: "manager_id",
              type: "input",
              message: "What is the employee's manager's ID?",
          }
      ])

      .then(function(response) {
          connection.query("INSERT INTO employee SET ?", {
                  first_name: response.first_name,
                  last_name: response.last_name,
                  role_id: response.role,
                  manager_id: response.manager_id,
              },
              function(err) {
                  if (err) throw err;
                  startPrompt();
              }
          );
      });
};

function addDepartment() {
  inquirer
      .prompt([
          {
              name: "department_id",
              type: "input",
              message: "What is the ID of the new department?",
          },
          {
              name: "department_name",
              type: "input",
              message: "What is the name of the new department?",
          }
      ])

      .then(function(response) {
          connection.query("INSERT INTO department SET ?", {
                  id: response.department_id,
                  department_name: response.department_name,
              },
              function(err) {
                  if (err) throw err;
                  startPrompt();
              }
          );
      });
};

function addRole() {
  inquirer
      .prompt([
          {
              name: "role_id",
              type: "input",
              message: "What is the ID of the new role?",
          },
          {
              name: "role_title",
              type: "input",
              message: "What is the title of the new role?",
          },
          {
              name: "role_salary",
              type: "input",
              message: "What is the salary of the new role?",
          },
          {
              name: "role_department",
              type: "input",
              message: "What is the department ID of the new role?",
          }
      ])

      .then(function(response) {
          connection.query("INSERT INTO role SET ?", {
                  id: response.role_id,
                  title: response.role_title,
                  salary: response.role_salary,
                  department_id: response.role_department,
              },
              function(err) {
                  if (err) throw err;
                  startPrompt();
              }
          );
      });
};

// todo
function updateEmployeeRole() {
  inquirer
      .prompt([
          {
              type: "input",
              message: "Which employee would you like to update?",
              name: "employeeUpdate"
          },
          {
              type: "input",
              message: "What role would you like to update to?",
              name: "roleUpdate"
          }
      ])
    //   log the updated role
    startPrompt();
}
