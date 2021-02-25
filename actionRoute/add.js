const addDepartment = () => {
    inquire.prompt([
      {
	name: 'newId',
	type: 'input',
	message: 'Enter ID number for the new Department'
      },
      {
	name:'newName',
	type: 'input',
	message: 'Enter Name for the new Department'
       }	
])
.then((answer) => {
	connection.query('INSERT INTO department_tbl  VALUES (`${result.newId}`, `${result.newName}`,
	function (err,res) {
		if (err) throw err;
		
 ) 
}


const addRoles = () => {

}


const addEmployee = () => {

}