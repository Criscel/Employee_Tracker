const inquirer = require ('inquirer');
const mysql = require('mysql');
const route = require('./actionRoute');


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
                    console.log('Update All');
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
              choices: ['View All Employee Details', 'View All Departments Only', 'View All Roles Only', 'View Employees by Manager']
          })
          .then((answer) => {
              switch (answer.action) {
                  case 'View All Employee Details':
                      route.viewEmpDetails();
                      break;

                   case 'View All Departments Only':
                      route.viewDeptOnly();
                      break;

                   case 'View All Roles Only':
                      route.viewRolesOnly();
                      break;

                    //BONUS
                   case 'View Employees by Manager':
                      viewEmpByMng();
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
              choices: ['Add Department', 'Add Roles', 'Add Employee']
          })
          .then((answer) => {
              switch (answer.action) {
                case 'Add Department':
                    addDeptarment();
                    break;

                  case 'Add Roles':
                      addRoles();
                      break;

                  case 'Add Employee':
                      addEmployee();
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
            choices: ['Employee Personal Details', 'Employee Roles', 'Employee Manager']
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
            }
        })
}