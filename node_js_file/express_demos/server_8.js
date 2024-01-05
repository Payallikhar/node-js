const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app_14");

console.log(app.get("env")); // env is aleays development unless you do export NODE_ENV=dev

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(`DB is ${DB}`);

// When the strict option is set to true, Mongoose will ensure that only the
// fields that are specified in your schema will be saved in the database,
// and all other fields will not be saved (if some other fields are sent).
mongoose.set("strictQuery", true);
mongoose.connect(DB).then((con) => {
  console.log(con.connection);
  console.log("connection successfull");
});

// Schema for fruits

const fruitSchema = new mongoose.Schema({
  fruitName: {
    type: String,
    required: [true, "fruitName is required"],
    unique: true,
  },
  from: String,
  nutrients: String,
  price: {
    type: Number,
    required: [true, "price of fruit is required"],
  },
  organic: Boolean,
  description: String,
});

// convention is to start with Caps
const FruitModel = mongoose.model('Fruit', fruitSchema);

// Now create object out of model above
const testFruit = new FruitModel({
  fruitName: 'Test Fruit',
  from: 'Nagpur',
  nutrients: 'Vitamin C',
  price: 100,
  organic: false,
  description: 'test fruid'
});

// finally save to DB
testFruit.save().then(doc => {
  console.log(`doc saved ${doc}`);
}).catch(err => {
  console.log(`error ${err}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
