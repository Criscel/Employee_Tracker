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

const empDetails = (programInit) => {
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
              console.log(`${answer.employeeDetails}`);
          })
    });  
    
}




module.exports = { empDetails, empRoles, empManager };