
 const mssql = require('mssql');
 const config = {
    user:process.env.SQL_USER,
    server:process.env.SQL_SERVER,
    password:process.env.SQL_PASS,
    port:parseInt(process.env.SQL_PORT),
    options:{trustServerCertificate:true}
}

 module.exports={
   
     GetAllCategory:(req,res)=>{// הצגת כל המוצרים
         mssql.connect(config)
         .then(function(conn){ 
             const Sql = `SELECT * FROM TCategory`;
             conn.query(Sql)
             .then(function(rows,error){
                 return res.status(200).json({res:rows.recordset});
             }).catch(function(err){
                 return res.status(500).json({err});
             });
         }).catch(function(err){
             return res.status(500).json({err});
         });     
    },



     AddCategory:(req,res)=>{ // הוספת מוצר חדש
        const {CName}=req.body;
        mssql.connect(config)
        .then(function(conn){
        const Sql = `INSERT INTO TCategory (CName) VALUES ('${CName}')`;
            conn.query(Sql)
            .then(function(rows){ 
                return res.status(200).json({res:rows.rowsAffected});
            }).catch(function(err){
                return res.status(500).json({err});
            })
            }).catch(function(err){
                return res.status(500).json({err});
            });
     },

     UpdateCategory:(req,res)=>{// עדכון מוצר
        const CId = req.params.CId;
        const {CName}=req.body;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `UPDATE TCategory SET CName='${CName}' WHERE CId ='${CId}' `;
            conn.query(Sql)
            .then(function(rows,error){
                return res.status(200).json({res:rows.recordset});
            }).catch(function(err){
                return res.status(500).json({err});
            });
        }).catch(function(err){
            return res.status(500).json({err});
        }); 
     },


     DeleteCategory:(req,res)=>{//מחיקת מוצר
        const CId = req.params.CId;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `DELETE FROM TCategory WHERE CId='${CId}'`;
            conn.query(Sql)
            .then(function(rows,error){
                return res.status(200).json({res:rows.recordset});
            }).catch(function(err){
                return res.status(500).json({err});
            });
        }).catch(function(err){
            return res.status(500).json({err});
        }); 
     },

     GetCategoryById:(req,res)=>{ // הצגת מוצר לפי קוד מוצר    
        const CId = req.params.CId;
        mssql.connect(config)
         .then(function(conn){
             const Sql = `SELECT * FROM TCategory WHERE CId='${CId}'`;
             conn.query(Sql)
             .then(function(rows,error){
                 return res.status(200).json({res:rows.recordset});
             }).catch(function(err){
                 return res.status(500).json({err});
             });
         }).catch(function(err){
             return res.status(500).json({err});
         }); 
     }
}