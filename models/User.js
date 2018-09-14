const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const Survey = require("./Survey");
var submitObj = {
  question: String,
  chosen: String,
  correct: Boolean
};
const userSchema = new Schema({
  googleId: String,
  survey: [Survey],
  submitted: Array
});
mongoose.model("users", userSchema);
