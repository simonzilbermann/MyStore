
 const mssql = require('mssql');
 const config = {
    user:process.env.SQL_USER,
    server:process.env.SQL_SERVER,
    password:process.env.SQL_PASS,
    port:parseInt(process.env.SQL_PORT),
    options:{trustServerCertificate:true}
}

 module.exports={
   
     GetAllProduct:(req,res)=>{// הצגת כל המוצרים
         mssql.connect(config)
         .then(function(conn){ 
             const Sql = `SELECT * FROM TProduct`;
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



     AddProduct:(req,res)=>{ // הוספת מוצר חדש
        const {Name,Price,Pic,Descp,Stock}=req.body;
        mssql.connect(config)
        .then(function(conn){
        const Sql = `INSERT INTO TProduct (Name,Price,Pic,Descp,Stock) VALUES ('${Name}',${Price},'${Pic}','${Descp}',${Stock})`;
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

     UpdateProduct:(req,res)=>{// עדכון מוצר
        const Pid = req.params.Pid;
        const {Name,Price,Pic,Descp,Stock}=req.body;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `UPDATE TProduct SET Name='${Name}',Price='${Price}',Pic='${Pic}',Descp='${Descp}',Stock='${Stock}' WHERE Pid ='${Pid}' `;
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


     DeleteProduct:(req,res)=>{//מחיקת מוצר
        const Pid = req.params.Pid;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `DELETE FROM TProduct WHERE Pid='${Pid}'`;
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

     GetProductById:(req,res)=>{ // הצגת מוצר לפי קוד מוצר    
        const Pid = req.params.Pid;
        mssql.connect(config)
         .then(function(conn){
             const Sql = `SELECT * FROM TProduct WHERE Pid='${Pid}'`;
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