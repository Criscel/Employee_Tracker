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

const empRoles = () => {

};

//BONUS
const empManager = () => {

};

module.exports = {empDetails, empRoles, empManager};