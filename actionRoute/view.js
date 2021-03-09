const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit } = require('./../server');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'company_db',
});


const viewEmpDetails = (programInit) => {
    connection.query('SELECT * FROM employee_tbl ',
        function (err, res) {
            if (err) throw err;
            console.table(res);

            programInit();
        });
};


const viewDeptOnly = (programInit) => {
    connection.query('SELECT * FROM department_tbl',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            programInit();
        })
};


const viewRolesOnly = (programInit) => {
    connection.query('SELECT * FROM role_tbl',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            programInit();
        })
};

//BONUS


const viewEmpByMng = (programInit) => {
    const managerArr = [];

    connection.query(`SELECT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM role_tbl 
    INNER JOIN employee_tbl m
    ON role_tbl.id = m.role_id
    AND role_tbl.role_title LIKE '%Manager%';`,
        (err, res) => {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                let managers = (res[i].manager);
                managerArr.push(managers);
            }

            inquirer.prompt([
                {
                    name: "manager",
                    type: "list",
                    message: "Select from the Managers below: ",
                    choices: managerArr
                }
            ])
                .then((answer) => {

                    const query = `SELECT a.ID, a.first_name, a.last_name, a.manager_id, b.manager
                    FROM employee_tbl a
                    INNER JOIN (SELECT role_id, CONCAT  (first_name,  ' ' ,  last_name) AS manager 
                                FROM employee_tbl 
                                WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.manager}%') b
                    WHERE a.manager_id = b.role_id;`;

                    connection.query(query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        programInit();
                    })
                });
        });
};

module.exports = { viewEmpDetails, viewDeptOnly, viewRolesOnly, viewEmpByMng };