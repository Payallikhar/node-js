const fs = require("fs");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

readFilePromise("./dog.txt").then((data) => {
  console.log(`Breed ${data}`);
});
