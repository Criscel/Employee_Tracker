const inquirer = require ('inquirer');
const mysql = require('mysql');

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
                    //viewAll();
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

  