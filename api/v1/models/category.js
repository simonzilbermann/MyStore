const mongoose = require('mongoose');
mongoose.pluralize(null);
const CategorySchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
CId:Number,
CName:String
});
//בצוא מודל עם שם האוסף בבסיס הנתונים והסכימה הכלולים בו
module.exports = mongoose.model("Category",CategorySchema)