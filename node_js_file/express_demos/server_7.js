const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'});
const app = require('./app_14');

console.log(app.get('env')); // env is aleays development unless you do export NODE_ENV=dev

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(`DB is ${DB}`);


// When the strict option is set to true, Mongoose will ensure that only the 
// fields that are specified in your schema will be saved in the database, 
// and all other fields will not be saved (if some other fields are sent).
mongoose.set('strictQuery', true);
mongoose.connect(DB).then(con =>{
  console.log(con.connection);
  console.log('connection successfull');
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});