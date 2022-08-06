const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
//טעינת משתני הסביבה לתוך אובייקט במערכת
require('dotenv').config();

//חיבור הראוטר של המשתמשים אל האפליקציה
const ProductRouter = require('./api/v1/routes/product');
const CategoryRouter = require('./api/v1/routes/category')
const UserRouter = require('./api/v1/routes/user');
const Auths=require("./api/v1/middlewares/Auths");



app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));


//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri = process.env.MONGO_CONN_STR;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('mongo db connected')});

//ניתובים,Auths
app.use("/user",UserRouter);
app.use("/product",Auths,ProductRouter);
app.use("/category",Auths,CategoryRouter);



//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 Page not Fount"})
    });
    
    module.exports = app;