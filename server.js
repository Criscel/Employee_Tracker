const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { viewEmpDetails, viewDeptOnly, viewRolesOnly, viewEmpByMng, viewTotal } = require('./actionRoute/view');

const { addDepartment, addRoles, addEmployee } = require('./actionRoute/add');

const { lastName, empRoles, empManager } = require('./actionRoute/update');

const { delEmpDetails, delDept, delRole } = require('./actionRoute/delete');

const { exit } = require('process');

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
              choices: ['View', 'Add', 'Update', 'Delete', 'Exit'],
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

                  case 'Exit':
                    connection.end();
                    process.exit();
              }
          });
  }

  const viewAll = () => {
      inquirer.prompt(
          {
              name: 'action',
              type: 'list',
              message: 'Select what you like to view: ',
              choices: ['View All Employee Details', 'View All Departments Only', 'View All Roles Only', 'View Employees by Manager', 'View Total Utilised Budget per Department', 'Done Viewing']
          })
          .then((answer) => {
              switch (answer.action) {
                  case 'View All Employee Details':
                      viewEmpDetails(programInit);
                      break;

                   case 'View All Departments Only':
                      viewDeptOnly(programInit);
                      break;

                   case 'View All Roles Only':
                      viewRolesOnly(programInit);
                      break;

                    //BONUS
                   case 'View Employees by Manager':
                      viewEmpByMng(programInit);
                      break;

                    //View the total utilized budget of a department -- ie the combined salaries of all employees in that department **
                    case 'View Total Utilised Budget per Department':
                        viewTotal(programInit);
                        break;

                   case 'Done Viewing':
                    programInit()
                    break;
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
                    addDepartment(programInit);
                    break;

                  case 'Add Roles':
                      addRoles(programInit);
                      break;

                  case 'Add Employee':
                      addEmployee(programInit);
                      break;
                  
                  case 'Done Adding':
                    programInit(programInit)
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
            choices: ['Employees Last Name', 'Employee Roles', 'Employee Manager', 'Done Updating']
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Employees Last Name':
                    lastName(programInit);
                    break;

                case 'Employee Roles':
                    empRoles(programInit);
                    break;
                //BONUS
                case 'Employee Manager':
                    empManager(programInit);
                    break;

                case 'Done Updating':
                    programInit(programInit);
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
                    delDept(programInit);
                    break;

                case 'Delete Role':
                    delRole(programInit);
                    break;
        
                case 'Delete Employee':
                    delEmpDetails(programInit);
                    break;

                case 'Done Deleting':
                    programInit(programInit);
                    break;
            }
        })
}

module.exports = {programInit};