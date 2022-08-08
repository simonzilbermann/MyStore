const category = require('../models/category');
const mongoose = require('mongoose');
const randomId = require('random-id');

module.exports={
    AddCategory:(req,res)=>{
        const CName = req.body;

        var len = 10;
        var pattern = '0123456789';
        var id = randomId(len, pattern)

        const cate = new category({
           _id:new mongoose.Types.ObjectId(),
           CId:id,
           CName:CName, 
        });
        cate.save().then(()=>{
            return res.status(200).json({"Message":"The new category is " + id});//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        })
    },

    UpdateCategory:(req,res)=>{
        category.updateOne({CId:req.params.Cid},req.body).then((cat)=>{
            return res.status(200).json(cat);//נקודת קצה שהניתוב שקיבלה תחזיר את הודעת ה json
        }); 
    },

    DeleteCategory:(req,res)=>{
        category.deleteOne({CId:req.params.Cid}).then((cat)=>{
            return res.status(200).json({"Message":"delete category by id ",CId:req.params.Cid});
        });
    },

    GetAllCategory:(req,res)=>{
        category.find({}).then((cat)=>{
            return res.status(200).json(cat);
        });
    },

    GetCategoryById:(req,res)=>{
        category.findOne({CId:req.params.Cid}).then((cat)=>{
            return res.status(200).json(cat);
        });
    }
}
