const fs = require("fs");
//client-side HTTP request library
// npm i superagent
const superagent = require("superagent");

// TO DISABLE CERTIFICATE VALIDATION CHECK
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("success");
    });
  });
};

readFilePromise("./dog.txt")
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePromise("./dog-img-p.txt", res.body.message);
  })
  .then(() => {
    console.log("Text written to file");
  })
  .catch((err) => {
    console.log("in catch block ", err);
  });
