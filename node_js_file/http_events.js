const http = require("http");

//creating server
const server = http.createServer();

// listener for request event
server.on("request", (req, res) => {
  console.log(`Request received! for path ${req.url}`);
  res.end("Request received");
});

// listener for request event
server.on("request", (req, res) => {
  console.log("Another request");
});

// listener for close event
server.on("close", () => {
  console.log("Server closed event called");
});

//start the server
server.listen(3000, "127.0.0.1", () => {
  console.log("Waiting for requests...(hit http://localhost:3000/ on browser)");
});

//ctrl + C  will not fire server close event , so uncomment this

/*
setTimeout(function () {
  server.close();
}, 5000);
*/
