const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/html-renderer");

 const OUTPUT_DIR = path.resolve(__dirname, 'output')
 const outputPath = path.join(OUTPUT_DIR, 'team.html');

const teamMembers = [];

function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      createTeam();
    });
  }
function createTeam() {
    inquirer.prompt([
    {
        type: "list",
        name: "setRole",
        message: "What type of employee?",
        choices: ["Engineer", "Intern", "Done"]
      }]).then(function (userChoice){
        switch(userChoice.setRole) {
            case "Engineer":
            addEngineer();
              break;
            case "Intern":
              addIntern();
              break;
            default:
             buildTeam();
          }
      })
}
function addEngineer() {
  console.log("Please build your team");
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is your employee's name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is your employee's id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is your eployee's email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "githubName",
      message: "What is your gitHub user name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    }
  ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.githubName);
    teamMembers.push(engineer);
    createTeam();
  
  });
}

function addIntern() {
  console.log("Please build your team");
  inquirer.prompt([
    {
      type: "input",
      name: "employeeName",
      message: "What is your employee's name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "employeeId",
      message: "What is your employee's id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    },
    {
      type: "input",
      name: "employeeEmail",
      message: "What is your employee's email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "school",
      message: "What is your School?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    }
  ]).then(answers => {
    const intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
    teamMembers.push(intern);
    createTeam();
  });
}
function buildTeam() {
  if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(teamMembers),  "utf-8")
}

  createManager();