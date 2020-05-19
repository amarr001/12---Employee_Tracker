DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);
CREATE TABLE roletracker (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (6,2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);
-- Department data--

INSERT INTO department (department_name)
VALUES ("Operations management");

INSERT INTO department (department_name)
VALUES ("Human Resources");

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO department (department_name)
VALUES ("IT");

-- Role data--
INSERT INTO roletracker (title, salary, department_id)
VALUES ("Manager", 100.000, 1);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Human Resource Manager", 65.000, 2);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Marketing Analyst", 60.000, 3);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Social Media Expert", 70.000, 3);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Marketing Director", 80.000, 3);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Accountant", 65.000, 4);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Software Engineer", 85.000, 5);

INSERT INTO roletracker (title, salary, department_id)
VALUES ("Network Administrator", 85.000, 5);


-- Employee data--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa", "Williamson", 2, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Wng", 6, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Silvia", "Patsoulas", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matthew", "Howie", 3, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Allison", "Waterhouse", 3, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 4, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "McGregor", 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Simons", 7, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Madison", "Banbridge", 7, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emma", "Speed", 8, 3);

SELECT * from department;
SELECT * from roletracker;
SELECT * from employee;