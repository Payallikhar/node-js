const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Fruit = require("./../models/fruit_model");

dotenv.config({ path: "./../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("Conection successfull");
  });

const fruits = JSON.parse(fs.readFileSync("./fruits_data.json", "utf-8"));

// IMPORT DATA IN DB
const importData = async () => {
  try {
    console.log(`fruits are ${fruits}`);
    await Fruit.create(fruits);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA
const deleteData = async () => {
  try {
    await Fruit.deleteMany();
    console.log("data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
