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

// function addEmployee() {
//   let query = "SELECT title FROM employees.role";
//   connection.query(query, function (err, res) {
//       if (err) throw err;
//       let roleArray = [];
//       inquirer
//           .prompt([

//               {
//                   type: "input",
//                   message: "What is the employee's first name?",
//                   name: "firstname"
//               },
//               {
//                   type: "input",
//                   message: "What is the employee's last name?",
//                   name: "lastname"
//               },
//               {
//                   type: "rawlist",
//                   choices: function () {
//                       for (let i = 0; i < res.length; i++) {
//                           roleArray.push(res[i].title);
//                       }
//                       return roleArray;
//                   },
//                   message: "What is the employee's role?",
//                   name: "role",
//               },
//               {
//                   type: "input",
//                   message: "What is the employer's manager's ID?",
//                   name: "manager_ID"
//               }
//           ])
//           .then(function (answer) {
//               let query = "INSERT INTO employee SET ?";
//               connection.query(query,
//                   {
//                       first_name: answer.firstname,
//                       last_name: answer.lastname,
//                       role_id: roleArray.indexOf(answer.role) + 1,
//                       manager_id: answer.manager_ID
//                   },
//                   function (err) {
//                       if (err) throw err;
//                   });
//               startApp();
//           });
//   });
// }


function addEmployee() {
  inquirer
      .prompt([
          // {
          //     name: "employeeID",
          //     type: "input",
          //     message: "What is the ID of the new employee?",
          // },
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
                  // id: response.employeeID,
                  first_name: response.first_name,
                  last_name: response.last_name,
                  role_id: response.role,
                  manager_id: response.manager_id,
              },
              function(err) {
                  if (err) throw err;
                  // console.log("Your new employee was created successfully!");
                  startApp();
              }
          );
      });
};

