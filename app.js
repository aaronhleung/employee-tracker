const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

function startApp() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "Please select an option",
                choices: ["View employees", "Add employee", "Update employee role", "View departments", "Add department", "View role", "Add role", "Exit program"],
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
                    quit();
            }
        }
    )
}

const viewEmployees = () => {
    db.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.log(results);
        startApp();
      });
}

