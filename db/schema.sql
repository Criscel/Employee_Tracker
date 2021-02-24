CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department_tbl (
    ID int NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE employee_tbl (
     ID int NOT NULL,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id VARCHAR(30) NULL,
     PRIMARY KEY (ID)
);

CREATE TABLE role_tbl (
    ID int NOT NULL,
    role_title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (ID)
);