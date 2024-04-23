
// Required for Node to read .env file
const fs = require('fs');
const https = require('https')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// required for communicating and connecting to the database
// and perform CRUD operations
const mongoose = require('mongoose');

// required for the application to run
const app = require('./app');

// Connect to the database and replace the password
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const options = {
  key:fs.readFileSync('server.key'),
  cert:fs.readFileSync('server.cert')
}

// Connect to the database
console.log(DB); // check the database connection string
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true,
    //useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
  });

const port = process.env.PORT || 3000;
https.createServer(options,app).listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`To test the IFT 554 REST App Click Or Type: https://localhost:${port}...`);
 });

// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
//   console.log(`To test the IFT 458 REST App Click Or Type: http://localhost:${port}...`);
// });


