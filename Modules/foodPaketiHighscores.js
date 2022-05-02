const mongoose = require("mongoose");

const foodPaketiHighscoresSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  score: {
    type: Number,
  },
  time:{
    type: Number,
  }
});

const foodPaketiHighscoresModel = mongoose.model(
  "food-paketi",
  foodPaketiHighscoresSchema
);
module.exports = foodPaketiHighscoresModel;
