const fs = require("fs");
//client-side HTTP request library
// npm i superagent
const superagent = require("superagent");

// TO DISABLE CERTIFICATE VALIDATION CHECK
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// LETS SEE CALLBACK HELL
fs.readFile("./dog.txt", (err, data) => {
  console.log(`Breed ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile("./dog-img-c.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Text written to file");
      });
    });
});

/// PROMISE WAY, BUT AGAIN a CALLBACK HELL
// Promise can be called in .then way and it will have .catch to catch error
fs.readFile("./dog.txt", (err, data) => {
  console.log(`Breed ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile("./dog-img-p.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Text written to file");
      });
    })
    .catch((err) => {
      console.log("in catch block ", err.message);
    });
});
