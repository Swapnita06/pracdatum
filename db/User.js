const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    roll:Number

});
module.exports = mongoose.model("user",userSchema);
