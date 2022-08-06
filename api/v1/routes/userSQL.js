const router = require('express').Router();
const {Reg,Login}=require("../controller/userSQL");

//נגדיר נקודת קצה end point
//עבור הרשמה והתחברות
router.post("/reg",Reg);
router.post("/login",Login);

module.exports=router;