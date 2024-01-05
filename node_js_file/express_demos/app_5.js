const fs = require("fs");
const express = require("express");

const app = express();

// following line act as middleware to modify incoming request data
// express.json() parses incoming request with JSON payload
// if this line is commented then the req.body in Post method will be undefined
app.use(express.json());

// own middleware
app.use((req,res,next) =>{
  console.log('Hello DevOps team , from middleware');
  next(); // to call next thing in pipeline // if this line is commented then control won't be passed to next in line
});

// own middleware, but applied to specific request
// check route app.route("/api/v1/fruitspath/:id").get(getAFruit);
// for this route this middleware won't be applicable
app.use('/api/v1/fruits', (req, res, next) => {
  req.requestTime = new Date(Date.now());
  next();
});

const fruits = JSON.parse(fs.readFileSync("../data/fruits_data.json", "utf-8"));

// lists all the fruits
const getAllFruits = (req, res) => {
  console.log(`getAllFruits request at ${req.requestTime}`);
  res
    .status(200)
    .json({ status: "success", results: fruits.length, data: { fruits } , requestedAt: req.requestTime});
};

// lists a fruit, with specified id
const getAFruit = (req, res) => {
  console.log(`getAFruit request at ${req.requestTime}`);
  // get the id from request, but this id will be string
  // this need a conversion to number
  const id = req.params.id * 1;

  // now get relevant objects from from json arr
  const fruit = fruits.find((e1) => e1.id === id);
  if (!fruit) {
    return res.status(404).json({ message: `No fruit found with id ${id}` });
  }
  res.status(200).json({ status: "success", data: { fruit } });
};

// merge fruit supplied by user on to existing fruits
const createFruit = (req, res) => {
  console.log(`createFruit request at ${req.requestTime}`);
  // create new id for new object
  const newId = fruits[fruits.length - 1].id + 1;
  console.log(`new id is ${newId}`);

  // create new object
  // merge request body in this new object
  const newFruit = Object.assign({ id: newId }, req.body);
  // push this new object in fruits JSON Array
  fruits.push(newFruit);

  // also update our file of fruits

  fs.writeFile("../data/fruits_data.json", JSON.stringify(fruits), (err) => {
    res.status(200).json({ status: "success", data: { newFruit } });
  });
};

app.route("/api/v1/fruits").get(getAllFruits).post(createFruit);

app.route("/api/v1/fruits/:id").get(getAFruit);
app.route("/api/v1/fruitspath/:id").get(getAFruit);

port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
