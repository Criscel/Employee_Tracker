const inquirer = require ('inquirer');
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
    function(err,res) {
        if (err) throw err;
        console.table(res);
        
        programInit();
    });
};


const viewDeptOnly = (programInit) => {
    connection.query('SELECT * FROM department_tbl',
    function(err,res) {
        if (err) throw err;
        console.table(res);
        programInit();       
    })
};


const viewRolesOnly = (programInit) => {
    connection.query('SELECT * FROM role_tbl',
    function(err,res) {
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
    (err,res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++){
        //console.log('array',res[i].manager);
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
            
            console.log('2nd',answer);
        /*    let managerID;

            for (i=0; i < managers.length; i++){
                if (answer.manager == managers[i].manager){
                    managerID = managers[i].id;
                }
            }
   
            // query all employees by selected manager
            const query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager
            FROM employee_tbl e
            LEFT JOIN employee_tbl m ON e.manager_id = m.id
            INNER JOIN role_tbl ON e.role_id = role_tbl.id
            INNER JOIN department_tbl ON role_tbl.department_id = department_tbl.id
            WHERE e.manager_id = ${managerID};`;
    
            connection.query(query, 
                function(err, res) {
                if (err) throw err;
                console.table(res);

                programInit();
            });*/
            programInit();
        });
    });
    };

   module.exports = {viewEmpDetails, viewDeptOnly, viewRolesOnly, viewEmpByMng};