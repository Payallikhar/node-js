const fs = require("fs");

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
    console.log(`Breed ${data}`);
    return data;
  })
  .then((data) => {
    writeFilePromise("./dog-img-p.txt", data);
    console.log("Text written to file");
  });
