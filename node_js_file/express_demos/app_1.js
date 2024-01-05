// requires expresss packages
const express = require("express");

// express() function puts new new Express application inside app variable
const app = express();

// application get request
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hello DevOps guys, this is response for your get(/) request");
});

// application get request
app.get("/json", (req, res) => {
  res
    .status(200)
    .json({
      message:
        "Hello DevOps guys, this is response for your get(/json) request",
    });
});

// application post request
app.post("/", (req, res) => {
  res
    .status(200)
    .send("Hello DevOps guys, this is response for your post(/) request");
});

// strating application on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
