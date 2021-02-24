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
              choices: ['View', 'Add', 'Update'],
          })
          .then((answer) => {
              switch (answer.action) {
                  case 'View':
                    console.log('View All');
                    viewAll();
                    break;
                  
                  case 'Add':
                    console.log('Add All');
                    //addAll();
                    break;

                  case 'Update':
                    console.log('Update All');
                    //updateAll();
                    break;    
              }
          })
  }

  const viewAll = () => {
      inquirer.prompt(
          {
              name: 'action',
              type: 'list',
              message: 'Select what would you like to view: ',
              choices: ['View All Employee Details', 'View All Departments Only', 'View All Roles Only']
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
              }
          })
  }