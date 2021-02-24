const mysql = require('mysql');

const viewEmpDetails = () = {
    connection.query('SELECT * FROM... ',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            console.table(`${result.ID}`, `${result.First_Name}`)       
        });
    })
}

const viewDeptOnly = () = {
    connection.query('SELECT department_name FROM department_tbl',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            console.table(`${result.ID}`, `${result.First_Name}`)       
        });
    })
}

const viewRolesOnly = () = {
    connection.query('SELECT role_title FROM role_tbl',
    function(err,res) {
        if (err) throw err;
        res.forEach(result => {
            console.table(`${result.title}`)       
        });
    })
}
