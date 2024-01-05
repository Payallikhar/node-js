// need http module
const http = require("http");

// creating server
const server = http.createServer((req, res) => {
  res.end("Hello DevOps Guys");
});

// listening to incoming request
server.listen(3000, "127.0.0.1", () => {
  console.log("Server listening to request on port 3000");
  console.log("Hit http://localhost:3000/ on browser");
});
