const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("anyEvent", () => {
  console.log("First Listener processed event");
});

myEmitter.on("anyEvent", () => {
  console.log("Second Listener processed event");
});


myEmitter.on("anyEvent", course => {
  console.log(`Third Listener processed event, the course name passed is '${course}'`);
});

console.log('Emitting event now ');
myEmitter.emit("anyEvent","DevOps");