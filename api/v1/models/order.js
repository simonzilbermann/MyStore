const mongoose = require('mongoose');
mongoose.pluralize(null);
const OrdersSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
ODetails:Array,
ODate:Date,
OId:Number,
uid:Number
});
//בצוא מודל עם שם האוסף בבסיס הנתונים והסכימה הכלולים בו
module.exports = mongoose.model("Orders",OrdersSchema)