const express = require("express");
const logger = require("morgan");
const fruitRouter = require("./routes/fruit_routes_6");
const userRouter = require("./routes/user_routes_2");

const app = express();

/*
 * MIDDLEWARE SECTION
 */

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello DevOps team , from middleware");
  next(); // to call next thing in pipeline // if this line is commented then control won't be passed to next in line
});

app.use((req, res, next) => {
  req.requestTime = new Date(Date.now());
  next();
});

// mount router as middleware
app.use("/api/v1/fruits", fruitRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
