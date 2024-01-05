const fs = require('fs');
const express = require('express');

/*
 * ROUTE HANDLERS
 */

const fruits = JSON.parse(fs.readFileSync("../data/fruits_data.json", "utf-8"));

// lists all the fruits
const getAllFruits = (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      results: fruits.length,
      data: { fruits },
      requestedAt: req.requestTime,
    });
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
  res
    .status(200)
    .json({ status: "success", data: { fruit }, requestedAt: req.requestTime });
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


/*
 * ROUTES SECTION
 */

// Lets create routes as middleware now
const router = express.Router();


/*
 * ACTUAL ROUTES
 */

router.route("/").get(getAllFruits).post(createFruit);
router.route("/:id").get(getAFruit);

module.exports = router;