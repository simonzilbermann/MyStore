const mongoose = require('mongoose');
mongoose.pluralize(null);
const ProductSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
PId:String,
Name:String,
Price:Number,
Pic:String,
Desc:String,
Stock:Number
});
//בצוא מודל עם שם האוסף בבסיס הנתונים והסכימה הכלולים בו
module.exports = mongoose.model("Products",ProductSchema)