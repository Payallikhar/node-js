const express = require("express");
const app = require('./app_10');

port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});