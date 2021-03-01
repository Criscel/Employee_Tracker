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

const empDetails = () => {

};

const empRoles = () => {

};

//BONUS
const empManager = () => {

};

module.exports = {empDetails, empRoles, empManager};