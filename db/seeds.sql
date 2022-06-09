use employee_tracker;

INSERT INTO departments (name)
VALUES
('Accounting'),
('Finance'),
('Sales'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Accounting Manager', 150000, 1),
('Senior Accountant', 120000, 1),
('Accountant', 100000, 2),
('Salesperson', 80000, 3),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Dave', 'Chen', 1, NULL),
('Paul', 'Nguyen', 2, 1),
('Wilson', 'Powell', 3, 1),
('Courtney', 'Ramos', 4, NULL),
('Nicholas', 'Smith', 5, NULL);