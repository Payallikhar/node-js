module.exports = (fruitObj, query) => {
  console.log(`query: ${JSON.stringify(query)}`);

  if (query.id == undefined || query.id === '{}') {
    console.log(`printing all fruits: ${JSON.stringify(fruitObj)}`);
    return fruitObj;
  }
  let fruit = fruitObj[query.id];
  console.log(`printing a fruit: ${JSON.stringify(fruit)}`);
  return fruit;
};
