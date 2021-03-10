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

const viewTotal = (programInit) => {
    const department_options = [];

    connection.query(`SELECT * FROM department_tbl;`, (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++){
            let department = res[i].department_name;
            department_options.push(department);
        }

        inquirer.prompt([
            {
                name: 'viewBudget',
                type: 'list',
                message: 'Select Department you want to view: ',
                choices: department_options
            }
        ])
        .then((answer) => {
            connection.query(`SELECT b.department_name, a.department_id, SUM(a.salary) AS Utilised_Budget
            FROM role_tbl as a
            INNER JOIN department_tbl b
            ON a.department_id = b.ID
            WHERE a.department_id = (SELECT ID FROM department_tbl WHERE department_name LIKE '${answer.viewBudget}')
            GROUP BY a.department_id;`, (err,res) => {
                if (err) throw err;
                console.log(`${answer.viewBudget}`);
                console.table(res);
                programInit();
            })      
        })
    })
    
};


module.exports = { viewEmpDetails, viewDeptOnly, viewRolesOnly, viewEmpByMng, viewTotal };