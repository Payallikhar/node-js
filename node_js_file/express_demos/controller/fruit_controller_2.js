const fs = require("fs");

const fruits = JSON.parse(fs.readFileSync("../data/fruits_data.json", "utf-8"));

exports.checkId = (req, res, next, val) => {
  console.log(`Fruit id is ${val}`);
  if (val > fruits.length) {
    res.status(400).json({ status: "fail", message: "Invalid id" });
  }
  next();
};

// lists all the fruits
exports.getAllFruits = (req, res) => {
  res.status(200).json({
    status: "success",
    results: fruits.length,
    data: { fruits },
    requestedAt: req.requestTime,
  });
};

// lists a fruit, with specified id
exports.getAFruit = (req, res) => {
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
exports.createFruit = (req, res) => {
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

exports.patchFruit = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Incomplete method, user should define this",
  });
};

exports.deleteFruit = (req, res) => {
  res.status(204).json({
    status: "success",
    data: "Incomplete method, user should define this",
  });
};
