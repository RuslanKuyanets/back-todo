const mongoose = require('mongoose');
require('dotenv').config()

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB_URI_TEST);
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
};