const inquirer = require ('inquirer');
const mysql = require('mysql');
const fs = require("fs");

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
        
            //ID: `${answer.newId}`,
            //department_name: `${answer.newName}`
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

};


const addEmployee = () => {

};

module.exports = {addDepartment, addRoles, addEmployee};