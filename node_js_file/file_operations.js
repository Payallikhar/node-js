const fs = require("fs");

const inputText = fs.readFileSync("./data/course.txt");
//const inputText = fs.readFileSync("./data/course.txt", "utf-8");
console.log("Printing the file ", inputText);

const outputText = `This is something which we already read: ${inputText}.\nAt date ${Date.now()}`;
fs.writeFileSync("./data/course_output.txt", outputText);
console.log("File written now");
