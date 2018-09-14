const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
var questionObj = {
  question: String,
  answer: String,
  options: Array
};
const surverySchema = new Schema({
  name: String,
  questions: [questionObj, questionObj]
});
mongoose.model("surveys", surverySchema);
