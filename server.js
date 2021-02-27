const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { viewEmpDetails, viewDeptOnly, viewRolesOnly } = require('./actionRoute/view');

const { addDepartment, addRoles, addEmployee } = require('./actionRoute/add');

//const updateRoute = require('./update.js');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'company_db',
  });

  connection.connect((err) => {
    if (err) throw err;
    programInit();
    connection.end();
  }); 

  const programInit = () => {
      inquirer.prompt(
          {
              name: 'action',
              type: 'list',
              message: 'Select action below: ',
              choices: ['View', 'Add', 'Update', 'Delete'],
          })
          .then((answer) => {
              switch (answer.action) {
                  case 'View':
                    console.log('View All');
                    viewAll();
                    break;
                  
                  case 'Add':
                    console.log('Add All');
                    addAll();
                    break;

                  case 'Update':
                    console.log('Update All');
                    updateAll();
                    break;    

                //BONUS
                  case 'Delete':
                    console.log('Delete All');
                    deleteAll();
                    break;
              }
          })
  }

  const viewAll = () => {
      inquirer.prompt(
          {
              name: 'action',
              type: 'list',
              message: 'Select what you like to view: ',
              choices: ['View All Employee Details', 'View All Departments Only', 'View All Roles Only', 'View Employees by Manager', 'Done Viewing']
          })
          .then((answer) => {
              switch (answer.action) {
                  case 'View All Employee Details':
                      viewEmpDetails();
                      break;

                   case 'View All Departments Only':
                      viewDeptOnly();
                      break;

                   case 'View All Roles Only':
                      viewRolesOnly();
                      break;

                    //BONUS
                   case 'View Employees by Manager':
                      //viewEmpByMng();
                      console.log('View Employees by Manager');
                      break;

                   case 'Done Viewing':
                    programInit()
                    break;

                    //View the total utilized budget of a department -- ie the combined salaries of all employees in that department **
              }
          })
  }

  const addAll = () => {
      inquirer.prompt(
          {
              name:'action',
              type: 'list',
              message: 'Select what you like to add: ',
              choices: ['Add Department', 'Add Roles', 'Add Employee', 'Done Adding']
          })
          .then((answer) => {
              switch (answer.action) {
                case 'Add Department':
                    addDepartment();
                    break;

                  case 'Add Roles':
                      addRoles();
                      break;

                  case 'Add Employee':
                      addEmployee();
                      break;
                  
                  case 'Done Adding':
                    programInit()
                    break;
              }
          })
  }

const updateAll = () => {
    inquirer.prompt (
        {
            name:'action',
            type: 'list',
            message: 'Select what you like to Update: ',
            choices: ['Employee Personal Details', 'Employee Roles', 'Employee Manager', 'Done Updating']
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Employee Personal Details':
                    empDetails();
                    break;

                case 'Employee Roles':
                    empRoles();
                    break;
                //BONUS
                case 'Employee Manager':
                    empManager();
                    break;

                case 'Done Updating':
                    programInit();
                    break;
            }
        })
}

//BONUS
const deleteAll = () => {
    inquirer.prompt (
        {
            name:'action',
            type: 'list',
            message: 'Select what you like to Delete: ',
            choices: ['Delete Department', 'Delete Role', 'Delete Employee', 'Done Deleting']
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Delete Department':
                    empDetails();
                    break;

                case 'Delete Role':
                    empRoles();
                    break;
        
                case 'Delete Employee':
                    empManager();
                    break;

                case 'Done Deleting':
                    programInit();
                    break;
            }
        })
}

module.exports = {programInit};