const product = require('../models/product');
const mongoose = require('mongoose');
const randomId = require('random-id');

module.exports={
    AddProduct:(req,res)=>{ // הוספת מוצר חדש
        const {Name,Price,Pic,Desc,Stock} = req.body;

        var len = 10;
        var pattern = '0123456789abcdefghijklmnopqrstuvwxyz'
        var id = randomId(len, pattern)

        const Prod = new product({
           _id:new mongoose.Types.ObjectId(),
           PId:id,
           Name:Name,
           Price:Price,
           Pic:Pic,
           Desc:Desc,
           Stock:Stock
        });
        Prod.save().then(()=>{
            return res.status(200).json({"Message":"The new prod is " + id});//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        })   
    },

    UpdateProduct:(req,res)=>{// עדכון מוצר
        product.updateOne({PId:req.params.Pid},req.body).then((prods)=>{
         return res.status(200).json(prods);//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        }); 
    },

    DeleteProduct:(req,res)=>{//מחיקת מוצר
        product.deleteOne({PId:req.params.Pid}).then((prods)=>{
          return res.status(200).json({"Message":"delete prod by id ",PId:req.params.Pid});
        });
    },
    GetAllProduct:(req,res)=>{// הצגת כל המוצרים
        product.find({}).then((prods)=>{
          return res.status(200).json(prods);
        });
    },    
    GetProductById:(req,res)=>{ // הצגת מוצר לפי קוד מוצר    
        product.findOne({PId:req.params.Pid}).then((prods)=>{
           return res.status(200).json(prods);
        });
    }
}