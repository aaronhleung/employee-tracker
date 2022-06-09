const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/index');
const {prompt} = require("inquirer");
const connection = require('./db/connection');


init();

function init() {
    startApp();
}

function startApp() {
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
    .then(() => startApp());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startApp());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startApp());
}