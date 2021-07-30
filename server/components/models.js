const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  email: String,
  role: String,
  dob: String,
  gender: String,
});
// nombre del dato
const model = mongoose.model("Employee", mySchema);
//El esquema del dato
module.exports = model;
