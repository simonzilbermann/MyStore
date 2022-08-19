const mongoose=require("mongoose");
const { token } = require("morgan");
mongoose.pluralize(null);
const UsersScheme=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    uid:{type:Number,require:true,},
    name:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:String,require:true}
 
})
module.exports=mongoose.model("User",UsersScheme);