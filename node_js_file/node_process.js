const fs = require("fs");

setTimeout(() => console.log("Timer 2 finished"), 1000);

fs.readFile("./data/course.txt", "utf-8", (err, data) => {
  console.log(`I/O finished , data is ${data}`);
});

console.log("This is top level code and should print first");
