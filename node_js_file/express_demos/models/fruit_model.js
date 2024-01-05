const mongoose = require('mongoose');

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

  //Model for Schema
// Convention create model name starting Caps
// Collection will be created with Fruits
  const Fruit = mongoose.model('Fruit', fruitSchema);
  module.exports = Fruit;