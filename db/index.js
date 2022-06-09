const connection = require("./connection");

// build constructors here
class DB {
    constructor(connection){
        this.connection = connection;
    }
    
    createEmployee(employee){
        return this.connection.promise().query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE ('${employee.first_name}', '${employee.last_name}', ${employee.role_id}, ${employee.manager_id});`
        );
    }
    createRole(roleName, roleSalary, roleDept){
        return this.connection.promise().query(
            `INSERT INTO role(title, salary, department_id) VALUE ('${roleName}', ${roleSalary}, ${roleDept});`
        );
    }
    createDepartment(department){
        return this.connection.promise().query(
            "INSERT INTO department(name) VALUE (?);", department
        );
    }
    
    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.role_id AS 'employee id', employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, role.department_id, department.name FROM employee, role, department WHERE role.department_id = department.id AND employee.role_id = role.id;"
        );
    }
    
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.title, role.salary, role.department_id, department.name AS 'department name' FROM role, department WHERE role.department_id = department.id;"
        );
    }
    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department;"
        );
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

// delete operations here

module.exports = new DB(connection);