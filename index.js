const template = require("./generateHTML");
const {green, blue, pink, red} = template.colors;
const generateHTML = template.generateHTML
const questions = [
  {
    type: "input",
    name: "username",
    message: "Type in your github username",
  },
  {
    message: "What is your favorite color?",
    name: "color",
    type: "list",
    choices: ["green", "blue", "pink", "red"],
  },
];

function writeToFile(fileName, data) {}

async function init() {
console.log(green);
console.log(generateHTML)
}

init();
