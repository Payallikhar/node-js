const fs = require("fs");
const express = require("express");

const app = express();

// following line act as middleware to modify incoming request data
// express.json() parses incoming request with JSON payload
// if this line is commented then the req.body in Post method will be undefined
app.use(express.json());

const fruits = JSON.parse(fs.readFileSync("../data/fruits_data.json", "utf-8"));

// lists all the fruits
const getAllFruits = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: fruits.length, data: { fruits } });
};

// lists a fruit, with specified id
const getAFruit = (req, res) => {
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

app.get("/api/v1/fruits", getAllFruits);
app.get("/api/v1/fruits/:id", getAFruit);
app.post("/api/v1/fruits", createFruit);

port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
