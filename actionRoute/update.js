const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit, updateAll } = require('./../server');
const { viewDeptOnly } = require('./view');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourRootPassword',
  database: 'company_db',
});

const empDetails = (programInit) => {
  inquirer.prompt([
    {
      name: "employeeDetails",
      type: "list",
      message: "Select Employee detail that needs to be updated: ",
      choices: ['Last Name', 'First Name', 'Back'],
    }
  ])
    .then((answer) => {
      switch (answer.action) {
        case 'Last name':
          console.log('Last name update');
          break;

        case 'First name':
          console.log('First name update');
          break;

        case 'Back':
          console.log('Main Menu');
          updateAll();
          break;
      }
    });

};

const empRoles = (programInit) => {
  const employeeArr = [];
  const roleArr = [];

  connection.query(`SELECT ID, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      let employee = res[i].Employee;
      employeeArr.push(employee);
    }
    connection.query(`SELECT * FROM role_tbl;`, (err, res) => {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        let roleName = res[i].role_title;
        roleArr.push(roleName);
      }

      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Select which Employee you want to update: ",
          choices: employeeArr
        },
        {
          name: 'UpdatedRole',
          type: "list",
          message: "Select Employee's Updated Role: (Please ADD ROLE if not available in selection)",
          choices: roleArr
        }
      ])
        .then((answer) => {

          const query = `UPDATE employee_tbl
            SET role_id = (SELECT ID FROM role_tbl WHERE role_title = '${answer.UpdatedRole}')
            WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.employee}%'`;

            connection.query(query,);

            console.log(`${answer.employee}`, `${answer.UpdatedRole}`);
            //console.log(query);

            connection.query(`SELECT e.ID, CONCAT(e.first_name, ' ' ,  e.last_name) AS Employee, e.role_id, r.role_title 
            FROM employee_tbl e
            INNER JOIN role_tbl r
            WHERE e.role_id = r.ID;`,
            function (err,res) {
            if (err) throw err;
            console.log('Employee Role Successfully Updated!');
            console.table(res);
            programInit();
        })
      })
    });
  })
};

//BONUS
const empManager = () => {
  console.log("BONUS, TBA")
};

module.exports = { empDetails, empRoles, empManager };