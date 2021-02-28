const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");
const promisemysql = require("promise-mysql");
const { restoreDefaultPrompts } = require('inquirer');

//const { programInit } = require('./../server');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'company_db',
  });

const addDepartment = () => {
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
            //programInit();
        })
    });
}

const addRoles = () => {
   const deptId = connection.query('SELECT * FROM department_tbl;', (err,res) => {
        if (err) throw err;
        //res.forEach(result => {
        //    console.table(result. department_name)
        //});
    //})
    //.then((answer) => {
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
                name:'newDeptId',
                type: 'list',
                message: 'Enter Department ID for the new Role: ',
                /*choice: (function deptID  ()  {
                    connection.query('SELECT * FROM department_tbl;', (err,res) => {
                        if (err) throw err;
                        res.forEach(result => {
                            console.table(result. department_name)
                        });
                     })
                })*/
            }    
        ])
      .then((answer) => {
      
        //connection.query(`INSERT INTO role_tbl (ID, role_title, salary, department_id) VALUES ("${answer.newId}","${answer.newRoleTitle}","${answer.newSalary}","${answer.newDeptId}")`, 
          console.log(departmentName);
          console.log(`${answer.newId}`,`${answer.newRoleTitle}`,`${answer.newSalary}`,`${answer.newDeptId}`);
          //);
          connection.query(`SELECT * FROM role_tbl`,
          function (err,res) {
              if (err) throw err;
              //console.log(`${answer.newId}`,`${answer.newRoleTitle}`,`${answer.newSalary}`,`${answer.newDeptId}`);
              console.log('New Role Successfully Added!');
              console.table(res);
              //programInit();
          })
      });
    })  
}

const addEmployee = () => {    
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
            //programInit();
        })
    });
    }

module.exports = {addDepartment, addRoles, addEmployee};