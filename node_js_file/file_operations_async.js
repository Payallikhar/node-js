const fs = require("fs");

/*
fs.readFile("./data/course.txt", "utf-8", function myCallback(err, data) {
    console.log(`print data when data is ready ${data}\n`);
});
*/

fs.readFile("./data/course.txt", "utf-8", function myCallback(err, data) {
  console.log(`print data when data is ready \n ${data}\n`);
});

// More simpler way , Arrow function expressions

/*
fs.readFile("./data/course.txt", "utf-8", (err, data) => {
  console.log(`print data when data is ready \n ${data}\n`);
});
*/

// Callback Hell , which should be avoided
/*
fs.readFile("./data/course.txt", "utf-8", (err, data) => {
  console.log(`Print course file ${data}\n`);
  fs.readFile("./data/course_append.txt", "utf-8", (err, appendData) => {
    console.log(`Print appended data ${appendData}\n`);
    fs.writeFile(
      "./data/course_output.txt",
      `${data}\n${appendData}`,
      "utf-8",
      (err) => {
        console.log("Writing to file is done");
      }
    );
  });
});
*/

console.log("\nMeanwhile lets continue with this other task\n");
