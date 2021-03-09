const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit, updateAll } = require('./../server');
const { viewDeptOnly } = require('./view');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'company_db',
  });

const empDetails = (programInit) => {
  inquirer.prompt([
    {
      name: "employeeDetails",
      type: "list",
      message: "Select Employee detail that needs to be updated: ",
      choices: ['Last Name', 'First Name', 'Back'],
    }
  ])
  .then((answer) => {
    switch(answer.action) {
      case 'Last name':
        console.log('Last name update');
      break;

      case 'First name':
        console.log('First name update');
        break;

      case 'Back':
        console.log('Main Menu');
        updateAll();
        break;
    }
  });

};

const empRoles = (programInit, employees) => {
  const employeeArr = [];

  connection.query(`SELECT id, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++){
      let employee = res[i].Employee;
      employeeArr.push(employee);
    }

  inquirer.prompt([
    {
      name: "employee",
      type: "list",
      message: "Select which Employee you want to update: ",
      choices: employeeArr
    },
    {
      name: 'UpdatedRole',
      type: "input",
      message: "Enter Employee's Updated Role: "
    }
  ])
  .then((answer) => {
    console.log(`${answer.employee}`, `${answer.UpdatedRole}`);
    //connection.query(`UPDATE`)
    programInit();
  })
});
};

//BONUS
const empManager = () => {
  console.log("BONUS, TBA")
};

module.exports = {empDetails, empRoles, empManager};