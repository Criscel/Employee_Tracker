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


const viewEmpDetails = () => {
    connection.query('SELECT * FROM employee_tbl ',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            //console.log(`ID: ${result.ID}`, ` || `, `First Name: ${result.first_name}`) 
            console.table(res);      
        });
    })
   // programInit();
};


const viewDeptOnly = () => {
    connection.query('SELECT * FROM department_tbl',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            console.table(res);       
        });
    })
};


const viewRolesOnly = () => {
    connection.query('SELECT * FROM role_tbl',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            console.table(res);       
        });
    })
};

//exports.viewRolesOnly = viewRolesOnly;
module.exports = {viewEmpDetails, viewDeptOnly, viewRolesOnly};