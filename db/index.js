const connection = require("./connection");

// build constructors here
class DB {
    constructor(connection){
        this.connection = connection;
    }
    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department;"
        );
    }
    
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.title, role.salary, role.department_id, department.name AS 'department name' FROM role, department WHERE role.department_id = department.id;"
        );
    }

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.role_id AS 'employee id', employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, role.department_id, department.name FROM employee, role, department WHERE role.department_id = department.id AND employee.role_id = role.id;"
        );
    }

}

module.exports = new DB(connection);