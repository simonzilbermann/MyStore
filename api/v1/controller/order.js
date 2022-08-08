const order = require('../models/order');
const mongoose = require('mongoose');
const randomId = require('random-id');


module.exports={
    GetAllOrder:(req,res)=>{// הצגת כל המוצרים
        order.find({},{_id:false}).then((orders)=>{
          return res.status(200).json(orders);
        });
    },  
    GetOrderById:(req,res)=>{ // הצגת מוצר לפי קוד מוצ ר    
        order.findOne({OId:req.params.Oid}).then((orders)=>{
           return res.status(200).json(orders);
        });
    },
    AddOrder:(req,res)=>{ // הוספת הזמנה חדש    
        const {ODetails,uid} = req.body;

        var len = 10;
        var pattern = '0123456789'
        var OId= randomId(len, pattern)
        const date = Date.now();
    
        const Orders = new order({
           _id:new mongoose.Types.ObjectId(),
            ODate:date,
            ODetails,
            OId:OId,
            uid:uid,
        });
        Orders.save().then(()=>{
            return res.status(200).json({"Message":"The new order is " + OId});//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        })  
    },

    UpdateOrder:(req,res)=>{// עדכון מוצר
        order.updateOne({OId:req.params.Oid},req.body).then((orders)=>{
         return res.status(200).json(orders);//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        }); 
    },

    DeleteOrder:(req,res)=>{//מחיקת מוצר
        order.deleteOne({OId:req.params.Oid}).then((orders)=>{
          return res.status(200).json({"Message":"delete order by id ",OId:req.params.Oid});
        });
    },
}