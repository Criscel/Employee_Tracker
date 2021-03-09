const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit } = require('./../server');

let department_options = [];
let newDeptId;

function getDepartments() {
    department_options = [];
    connection.query(
    `SELECT * FROM department_tbl;`, (err, res) => {
    if (err) throw err;
    // show result here
    for (i = 0; i < res.length; i++){
        let department = res[i].department_name;
        department_options.push(department);
    }
    //console.log('top',department_options);
    });
    //return department_options;
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'company_db',
  });

const addDepartment = (programInit) => {
    inquirer.prompt([
      {
	name: 'newId',
	type: 'input',
	message: 'Enter ID number for the new Department: '
      },
      {
	name:'newName',
	type: 'input',
	message: 'Enter Name for the new Department: '
       }	
    ])
    .then((answer) => {
        connection.query(`INSERT INTO department_tbl (ID, department_name) VALUES ("${answer.newId}","${answer.newName}")`, 
        );
        connection.query(`SELECT * FROM department_tbl`,
        function (err,res) {
            if (err) throw err;
            console.log(`${answer.newId}`, `${answer.newName}`);
            console.log('New Department Successfully Added!');
            console.table(res);
            programInit();
        })
    });
}


const addRoles = (programInit) => {
    getDepartments();
        inquirer.prompt([
            {
                name: 'newId',
                type: 'input',
                message: 'Enter ID number for the new Role: '
            },
            {
                name:'newRoleTitle',
                type: 'input',
                message: 'Enter Title for the new Role: '
            },
            {
                name:'newSalary',
                type: 'input',
                message: 'Enter Salary for the new Role: '
            },    
            {
                name:'newDept',
                type: 'list',
                message: 'Select Department for the new Role: ',
                choices: department_options
            }    
        ])
      .then((answer) => {
        connection.query(`SELECT ID FROM department_tbl WHERE department_name = "${answer.newDept}";`,
        (err,res) => {
            if (err) throw err;
            newDeptId = res[0].ID;
            //console.log(newDeptId);
        
        connection.query(`INSERT INTO role_tbl (ID, role_title, salary, department_id) VALUES ("${answer.newId}","${answer.newRoleTitle}","${answer.newSalary}","${newDeptId}")`,);

          console.log(`${answer.newId}`,`${answer.newRoleTitle}`,`${answer.newSalary}`, newDeptId,`${answer.newDept}`);

          connection.query(`SELECT * FROM role_tbl`,
          function (err,res) {
              if (err) throw err;

              console.log('New Role Successfully Added!');
              console.table(res);
              programInit();
          })
        })
      });
    } 


const addEmployee = (programInit) => {    
    inquirer.prompt([
        {
            name: 'newId',
            type: 'input',
            message: 'Enter ID number for the new Employee: '
        },
        {
            name:'firstName',
            type: 'input',
            message: 'Enter First Name of the new Employee: '
        },
        {
            name:'lastName',
            type: 'input',
            message: 'Enter Last Name of the new Employee: '
        },	
        {
            name:'roleId',
            type: 'input',
            message: 'Enter Role ID of the new Employee: '
        },	
       /* {
            name:'managerId',
            type: 'input',
            message: 'Enter Managers ID of the new Employee (press enter if null): '
        },	*/
    ])
    .then((answer) => {
        connection.query(`INSERT INTO employee_tbl (ID, first_name, last_name, role_id) VALUES ("${answer.newId}", "${answer.firstName}", "${answer.lastName}", "${answer.roleId}")`,);
        
        console.log(`${answer.newId}`, `${answer.firstName}`, `${answer.lastName}`, `${answer.roleId}`);

        connection.query(`SELECT * FROM employee_tbl`,
        function (err,res) {
            if (err) throw err;
            console.log('New Employee Successfully Added!');
            console.table(res);
            programInit();
        })
    })
};


module.exports = {addDepartment, addRoles, addEmployee};