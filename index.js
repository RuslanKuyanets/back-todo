require('dotenv').config()
const mongoose = require('mongoose') 
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})

const PORT = 5000;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");

  app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
  });
});