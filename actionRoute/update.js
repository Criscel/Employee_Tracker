const inquirer = require('inquirer');
const mysql = require('mysql');
const fs = require("fs");

const { programInit } = require('./../server');
const { viewDeptOnly } = require('./view');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourRootPassword',
  database: 'company_db',
});

const lastName = (programInit) => {
  const employeeArr = [];

  connection.query(`SELECT ID, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      let employee = res[i].Employee;
      employeeArr.push(employee);
    }

    inquirer.prompt([
      {
        name: 'updateLast',
        type: 'list',
        message: 'Select Employee that needs to be Updated: ',
        choices: employeeArr
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Enter Updated Employee Last Name: "
      }
    ])
      .then((answer) => {
        connection.query(`UPDATE employee_tbl SET last_name = '${answer.lastName}'
    WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.updateLast}%';`);

        connection.query(`SELECT ID, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
          if (err) throw err;
          console.log("Employee's Last Name Successfully Updated!")
          console.table(res);
          programInit();
        })
      })
  })
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
          message: "Select Employee's Updated Role: (Please ADD ROLE first if not available in selection)",
          choices: roleArr
        }
      ])
        .then((answer) => {

          const query = `UPDATE employee_tbl
            SET role_id = (SELECT ID FROM role_tbl WHERE role_title = '${answer.UpdatedRole}')
            WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.employee}%';`;

          connection.query(query,);

          connection.query(`SELECT e.ID, CONCAT(e.first_name, ' ' ,  e.last_name) AS Employee, e.role_id, r.role_title 
            FROM employee_tbl e
            INNER JOIN role_tbl r
            WHERE e.role_id = r.ID;`,
            function (err, res) {
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
const empManager = (programInit) => {
  const employeeArr = [];
  const managerArr = [];

  connection.query(`SELECT ID, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee_tbl;`, (err, res) => {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      let employee = res[i].Employee;
      employeeArr.push(employee);
    }

    connection.query(`SELECT m.id, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM role_tbl 
    INNER JOIN employee_tbl m
    ON role_tbl.id = m.role_id
    AND role_tbl.role_title LIKE '%Manager%';`,
      (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
          let managers = (res[i].manager);
          managerArr.push(managers);
        }

        inquirer.prompt([
          {
            name: "employee",
            type: "list",
            message: "Select which Employee you want to update: ",
            choices: employeeArr
          },
          {
            name: "manager",
            type: "list",
            message: "Select the Updated Managers below: (Please ADD MANAGER first if not available in selection)",
            choices: managerArr
          }
        ])
          .then((answer) => {
            const query = `UPDATE employee_tbl 
            SET manager_id = (SELECT role_id FROM (SELECT role_id FROM employee_tbl WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.manager}%') AS B )
            WHERE CONCAT(first_name, ' ' ,  last_name) LIKE '%${answer.employee}%';`;

            connection.query(query,);

            connection.query(`SELECT a.ID, a.first_name, a.last_name, a.manager_id, b.manager
            FROM employee_tbl a
            INNER JOIN (SELECT role_id, CONCAT  (first_name,  ' ' ,  last_name) AS manager FROM employee_tbl) b
            WHERE a.manager_id = b.role_id;`,
              function (err, res) {
                if (err) throw err;
                console.log('Employee Manager Successfully Updated!');
                console.table(res);
                programInit();
              })
          })
      })
  })
};

module.exports = { lastName, empRoles, empManager };