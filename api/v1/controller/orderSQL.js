
 const mssql = require('mssql');
 const config = {
    user:process.env.SQL_USER,
    server:process.env.SQL_SERVER,
    password:process.env.SQL_PASS,
    port:parseInt(process.env.SQL_PORT),
    options:{trustServerCertificate:true}
}

 module.exports={
   
     GetAllOrder:(req,res)=>{// הצגת כל המוצרים
         mssql.connect(config)
         .then(function(conn){ 
             const Sql = `SELECT * FROM TOrder`;
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



     AddOrder:(req,res)=>{ // הוספת מוצר חדש
        const {ODetails,uid}=req.body;
        const ODate = Date.now();
    
        mssql.connect(config)
        .then(function(conn){
        const Sql = `INSERT INTO TOrder (ODate,ODetails,uid) VALUES ('${ODate}','${ODetails}','${uid}')`;
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

     UpdateOrder:(req,res)=>{// עדכון מוצר
        const OId = req.params.OId;
        const {ODate,ODetails,uid}=req.body;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `UPDATE TOrder SET OId='${OId}',ODate='${ODate}',ODetails='${ODetails}',uid='${uid}'`;
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


     DeleteOrder:(req,res)=>{//מחיקת מוצר
        const OId = req.params.OId;
        mssql.connect(config)
        .then(function(conn){
            const Sql = `DELETE FROM TOrder WHERE OId ='${OId}'`;
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

     GetOrderById:(req,res)=>{ // הצגת מוצר לפי קוד מוצר    
        const OId = req.params.OId;
        mssql.connect(config)
         .then(function(conn){
             const Sql = `SELECT * FROM TOrder WHERE OId='${OId}'`;
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