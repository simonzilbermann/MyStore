const mssql = require('mssql');
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const config = {
    user:process.env.SQL_USER,
    server:process.env.SQL_SERVER,
    password:process.env.SQL_PASS,
    port:parseInt(process.env.SQL_PORT),
    options:{trustServerCertificate:true}
}



module.exports={

    Login:(req,res)=>{
        mssql.connect(config).
        then(function(conn){//חיבור
            const {email,password}=req.body;
            const Sql = `SELECT * FROM TUser WHERE email='${email}'`;
            conn.query(Sql).then(function(rows,error){//query זה בשביל לריץ שאילתה
                //בידה ונוצרה שגיאה או שכמות הרשומות שחזרה שונה מאחד
                if(error || rows.recordset.length != 1)//recordset rows-מערך של כול אנתונים שחזרו מ
                return res.status(409).json({Msq:"Login Error user or password not found"});

            const user = rows.recordset[0];    
            bcrypt.compare(password,user.password).then((status)=>{
                if(!status)
                    return res.status(409).json({msq:"Login Error user or password not found"});

                    const token = jwt.sign({email:email,Uid:user.Uid},process.env.SECRET_KEY,{expiresIn:"1H"});
                    return res.status(200).json({Uid:user.Uid,token})  
            });

        }).catch((err)=>{
            console.log(err);
            return res.status(500).json({msq:"server Error Database Connection",err});
    });
          
        })
        .catch(function(err){
            console.log(err);
            return res.status(500).json({err});
        });
    },

    Reg:(req,res)=>{
        mssql.connect(config).then(function(conn){
            const {email,password} = req.body;
            const Sql = `Select * from TUser where email='${email}'`;
           
            conn.query(Sql).then(function(rows){ 
                //במידה וקיים משתמש עם אותו שם השתמש, זה לא תקין
                if(rows.recordset.length != 0)
                    return res.status(401).json({Err:"Username already Exist"});
                    //מבצעים הצפנה לסיסמה ושומרים בבסיס הנתונים
                    bcrypt.hash(password,12).then((hash)=>{
                        //יצירת משפט שאילתא להוספת המשתמש
                        const Sql = `insert into TUser (email,password) values ('${email}','${hash}')`;
                        //הפעלת השאילתה
                        conn.query(Sql).then((rows,error)=>{

                            return res.status(200).json({msg:"User Registered successfully"});   
                                
                        }).catch((err)=>{
                            return res.status(500).json({err});
                        });
                    }).catch((err)=>{
                        return res.status(500).json({err});
                    });
            }).catch((err)=>{
                return res.status(500).json({err});
            });
        }).catch((err)=>{
            return res.status(500).json({err});
        });
    }
}