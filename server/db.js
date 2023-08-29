const mongoose = require("mongoose");
require('dotenv').config();


const connectToMongo = ()=>{
    mongoose.connect(process.env.DB_HOST,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB CONNECTED");
      })
      .catch((e) => {
        console.log("Error", e);
      });
};

module.exports = connectToMongo;
