const User = require("../models/user");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const randomId = require('random-id');

module.exports={

    Login:(req,res)=>{
        const {email,password}=req.body;

        User.find({email}).then((rows)=>{
            if(rows.length == 0)//במידה והמשתצש לא נמצא
                return res.status(409).json({msg:"User Not Found"})
            //הפונקציה מקבלת מחרוזת ואת המחרוזת המוצפנת,
            //ומחזירה אמת במידה והן תואמות, אחרת תחזיר שקר
            bcrypt.compare(password,rows[0].password).then((status)=>{
                if(!status)//במידה והסיסמה אינה תואמת נחזיר שגיאה
                    return res.status(409).json({msg:"User Not Fount"});
                else
                {
                    //הפונקציה מקבלת מחרוזת ליצירת, קוד מפתח שהמצאנו, זמן תפוגה
                    // const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"1H"})
                    return res.status(200).json({msg:"User Login Succesfully"})  
                }             
            });
        });
    },

    Reg:(req,res)=>{
        const {uid,name,password,email}=req.body;
        User.find({email}).then((rows)=>{
            if(rows.length > 0)//במידה ונמצא משתמש עם אותו שם משתמש
                return res.status(409).json({msg:"UserAlready Exist Please Choiose Another"})
            
                var len = 10;
                var pattern = '0123456789'
                var id = randomId(len, pattern)
                      //יצירת האובייקט מסוג משתמש
                    bcrypt.hash(password,12).then((hashPass)=>{
                        const users =new User({
                            _id:new mongoose.Types.ObjectId(),
                            uid:id,
                            name:name,
                            password:hashPass,
                            email:email
                        });
                        users.save().then((user)=>{
                            return res.status(200).json({msg:"User Registed succesfully",user});
                        }).catch((error)=>{
                            return res.status(505).json({error});
                        });
                    });               
        });
    }
}