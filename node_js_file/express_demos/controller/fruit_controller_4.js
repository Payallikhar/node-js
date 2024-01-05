const Fruit = require(".././models/fruit_model");

// lists all the fruits
exports.getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.status(200).json({
      status: "success",
      results: fruits.length,
      data: { fruits },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// lists a fruit, with specified id
exports.getAFruit = async (req, res) => {
  const fruit = await Fruit.findById(req.params.id);

  try {
    res.status(200).json({ status: "success", data: { fruit } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// merge fruit supplied by user on to existing fruits
exports.createFruit = async (req, res) => {
  try{
    const newfruit = await Fruit.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { fruit: newfruit }
    });
  }catch(err){
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.patchFruit = async (req, res) => {
  try {
    console.log('called patch fruit ', req.body);
    const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // new updated doc will be return
      runValidators: true
    });
    res.status(200).json({ status: 'success', data: { fruit } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteFruit = async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err });
  }
};
