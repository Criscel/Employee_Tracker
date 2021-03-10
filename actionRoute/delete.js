const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit } = require('./../server');
const { viewDeptOnly } = require('./view');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourRootPassword',
  database: 'company_db',
});

const delDept = (programInit) => {
    const department_options = [];

    connection.query(`SELECT * FROM department_tbl;`, (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++){
            let department = res[i].department_name;
            department_options.push(department);
        }

        inquirer.prompt([
            {
                name: 'delDepartment',
                type: 'list',
                message: 'Select Department that needs to be DELETED: ',
                choices: department_options
            }
        ])
        .then((answer) => {
            connection.query(`DELETE FROM department_tbl WHERE department_name = '${answer.delDepartment}';`,);

            connection.query(`SELECT * FROM department_tbl;`, (err,res) => {
                if (err) throw err;
                console.log("Department Successfully Deleted!");
                console.table(res);
                programInit();
            })
        })
    });
};

const delRole = (programInit) => {
    const roleArr = [];

    connection.query(`SELECT * FROM role_tbl;`, (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
          let roleName = res[i].role_title;
          roleArr.push(roleName);
        }

        inquirer.prompt([
            {
                name: 'deleteRole',
                type: "list",
                message: "Select Role that needs to be DELETED: ",
                choices: roleArr
            }
        ])
        .then((answer) => {
            connection.query(`DELETE FROM role_tbl where role_title = '${answer.deleteRole}';`,);

            connection.query(`SELECT * FROM role_tbl;`, (err,res) => {
                if (err) throw err;
                console.log("Role Successfully Deleted!");
                console.table(res);
                programInit();
            })
        })
    })
};


const delEmpDetails = (programInit) => {
    const employeeArr = [];

    connection.query(`SELECT ID, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
          let employee = res[i].Employee;
          employeeArr.push(employee);
        }
        inquirer.prompt([
            {
              name: "employeeDetails",
              type: "list",
              message: "Select Employee that needs to be DELETED: ",
              choices: employeeArr
            }
          ])
          .then ((answer) => {
              connection.query(`DELETE FROM employee_tbl WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.employeeDetails}%';`,);

                connection.query('SELECT * FROM employee_tbl;', (err, res) => {
                    if (err) throw err;
                    console.log("Employee Successfully Deleted! ")
                    console.table(res);
                    programInit();
                })
          })
    });  
    
};





module.exports = { delEmpDetails, delDept, delRole };