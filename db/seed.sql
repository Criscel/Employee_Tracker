INSERT INTO department_tbl (ID,department_name)
VALUES ("70001", "Human Resource"),
("70010", "Finance"),
("70020", "Marketing"),
("70030", "Information Technology");

INSERT INTO role_tbl (ID,role_title,salary,department_id)
VALUES ("101", "Training and Development", "65000", "70001"),
("111", "Payroll", "75000", "70010"),
("201", "Marketing Analyst", "80000", "70020"),
("301", "Database Admistrator", "90000", "70030");

INSERT INTO employee_tbl (ID, first_name, last_name, role_id, manager_id)
VALUES ("90210","Agnes","Miranda","111", null),
("90220","Mallows","Estrella","101",null),
("90230","Nonot","Ippa","301", null),
("90240","Checila","Sigua","201",null);
