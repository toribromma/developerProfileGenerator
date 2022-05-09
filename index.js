const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs").promises;
const util = require("util");
const template = require("./generateHTML");
var pdf = require("html-pdf");
var config = {
  height: "800px",
  width: "600px",
};
const generateHTML = template.generateHTML;

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

function promptUser() {
  return inquirer.prompt(questions);
}

function getUserInfo(username) {
  const queryUrl = `https://api.github.com/users/${username}`;
  return axios.get(queryUrl);
}

function getStars(username) {
  const queryUrl = `https://api.github.com/users/${username}/repos`;
  return axios.get(queryUrl);
}

// const writeFileAsync = util.promisfy(fs.writeFile)

async function init() {
  //   console.log(green);
  //   console.log(generateHTML);

  try {
    const answers = await promptUser();
    // console.log(answers);
    const { username, color } = answers;
    const res = await getUserInfo(username);
    const repData = await getStars(username);

    console.log(repData.data);
    let starCount = 0;

    for (let index = 0; index < repData.data.length; index++) {
      let count = repData.data[index].stargazers_count;
      starCount = starCount + count;
    }

    // console.log(data);
    const {
      avatar_url,
      name,
      location,
      html_url,
      blog,
      bio,
      public_repos,
      followers,
      following,
    } = res.data;

    const data = {
      avatar_url: avatar_url,
      name: name,
      location: location,
      html_url: html_url,
      blog: blog,
      bio: bio,
      public_repos: public_repos,
      followers: followers,
      following: following,
      color: color,
      starCount: starCount,
    };

    // console.log(data)

    const html = await generateHTML(data);

    await fs.writeFile("index.html", html);

    const readHtml = await fs.readFile("index.html", "utf8");

    pdf.create(readHtml, config).toFile("./profile.pdf", function (err, res) {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

init();
