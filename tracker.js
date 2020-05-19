
// Imports.
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');



// DB connection for this session.

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'datacbd!',
  database: 'tracker_db',
});

// Wrap connection.connect() in a promise
async function connect() {
  return new Promise((resolve, reject) => {
      connection.connect(err => {
          if (err) reject(err); 
          else resolve(); 
      })
  })
}
// Wrap connection.query() in a promise
async function query(command, values) {
  return new Promise((resolve, reject) => {
      connection.query(command, values, (error, results) => {
          if (error) reject(error); 
          else resolve(results); 
      })
  })
}
async function main() {
    
    // Breathe the fresh air of promisified connections.
    await connect();
    console.log("You are connected!", connection.threadId);
    
    // Keep asking questions, or at least until we ask to 'exit'.
    while (true) {
        
        // What to do?
        const { firstAction } = await inquirer.prompt({
            name: 'firstAction',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
              "View All Employees by Department", 
              "View All Employees by Manager",
              "Add Employee",
              "Remove Employee",
              "Update Employee Role",
              "Update Employee Manager",
              "Exit"
            ],
        });
        
        // Make a new auction item.
        if (firstAction === 'View All Employees by Department') {
            
          // Describe the item.
          const answers = await inquirer.prompt([
              {
                  name: 'departmentSelection',
                  type: 'list',
                  message: 'Which department?',
                  choices: [
                    "Operations management",
                    "Human Resources",
                    "Marketing",
                    "Finance",
                    "IT"
                  ]
              }
          ]);

          switch (answers.departmentSelection) {

            case "Operations management":
              const manager = await query (`
              SELECT first_name, last_name
              FROM employee
              WHERE role_id = 1`);
             for (var i = 0; i < manager.length; i++) {
              console.log(
                "\n" + "Employee: " +
                  manager[i].first_name +  " "  + manager[i].last_name + "\n"
              );
             }
              break;
            
            case "Human Resources":
              const hr = await query (`
              SELECT first_name, last_name
              FROM employee
              WHERE role_id = 2`);
             for (var i = 0; i < hr.length; i++) {
              console.log(
                "\n" + "Employee(s): " +
                  hr[i].first_name +  " "  + hr[i].last_name + "\n"
              );
             }
              
              break;
      
            case "Marketing":
              const marketDep = await query (`
              SELECT first_name, last_name
              FROM employee
              LEFT JOIN roletracker ON roletracker.id = employee.role_id
              WHERE roletracker.department_id = 3
            `);
             for (var i = 0; i < marketDep.length; i++) {
              console.log(
                "\n" + "Employee(s): " +
                  marketDep[i].first_name +  " "  + marketDep[i].last_name + "\n"
              );
             }
              break;
      
            case "Finance":
              const financeDep = await query (`
              SELECT first_name, last_name
              FROM employee
              LEFT JOIN roletracker ON roletracker.id = employee.role_id
              WHERE roletracker.department_id = 4
            `);
             for (var i = 0; i < financeDep.length; i++) {
              console.log(
                "\n" + "Employee(s): " +
                financeDep[i].first_name +  " "  + financeDep[i].last_name + "\n"
              );
             }
              break;
      
            case "IT":
              const itDep = await query (`
              SELECT first_name, last_name
              FROM employee
              LEFT JOIN roletracker ON roletracker.id = employee.role_id
              WHERE roletracker.department_id = 5
            `);
             for (var i = 0; i < itDep.length; i++) {
              console.log(
                "\n" + "Employee(s): " +
                itDep[i].first_name +  " "  + itDep[i].last_name + "\n"
              );
             }
              break;
            }

          
          // Check whether the query worked or not.
          console.log("Company Folks.\n");
      }
       // *********************

       if (firstAction === 'Add Employee') {
            
          const answers = await inquirer.prompt([
            {
                name: 'firstname',
                type: 'input',
                message: "Employee's first name?"
            },
            {
              name: 'lastname',
              type: 'input',
              message: "Employee's last name?"
            },
            {
                name: 'role',
                type: 'number',
                message: 'Which role?'
            },
            {
              name: 'managerId',
              type: 'number',
              message: "Type the manager's id"
          }
        ]);
        
        // Okay, let's create it in the database.
        await query(
        "INSERT INTO employee SET ?",
        [{
          first_name: answers.firstname,
          last_name: answers.lastname,
          role_id: answers.role || 0,
          manager_id: answers.managerId || 0
        }],
        );
        
        // Check whether the query worked or not.
        console.log("Employee added successfully!\n");
      }
        
        
        else if (firstAction === "Exit") {
            console.log("Thanks, see you later!\n");
            break;
        }
    }
    
    // Tidy up.
    connection.end();
}

// Start the app.
main().catch(err => console.log(err));