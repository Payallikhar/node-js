const dotenv = require('dotenv')

dotenv.config({path: './config.env'});
const app = require('./app_14');

console.log(app.get('env')); // env is aleays development unless you do export NODE_ENV=dev
console.log(process.env.DATABASE); // COURSE=DEVOPS node server_5.js

// to see variable from this OS (comes from process core module , available automatically)
// console.log(process.env);

port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});