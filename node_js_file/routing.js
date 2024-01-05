const http = require("http");
const fs = require("fs");

// creating server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log("pathName is ", pathName);

  if (pathName === "/course") {
    res.end("This is DevOps course");
  } else if (pathName === "/session") {
    res.end("This is Node js session");
  } else if (pathName === "/fruits") {
    fs.readFile("./data/fruits_data.json", "utf-8", (err, data) => {
      // converting string data to JSON
      const jsonData = JSON.parse(data);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(data);
      //res.end(jsonData); // the res.end expects string, will throw error
    });
  } else {
    // header is mechanism to provide information about
    // response to client or browser
    res.writeHead(404, {
      //"Content-Type": "text/plain",
      "Content-Type": "text/html",
    });

    //res.end("Page not found !!!. \n The header should be text/plain");
    res.end(
      "<h1>Page not found !!!</h1></br><h1>The header should be text/html</h1>"
    );
  }
});

// listening to incoming request
server.listen(3000, "127.0.0.1", () => {
  console.log("Server listening to request on port 3000");
  console.log(
    "Hit either http://localhost:3000/course  OR http://localhost:3000/course OR http://localhost:3000/fruits on browser"
  );
});
