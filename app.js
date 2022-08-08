const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
//טעינת משתני הסביבה לתוך אובייקט במערכת
require('dotenv').config();


//חיבור הראוטר של המשתמשים אל האפליקציה
const ProductRouter = require('./api/v1/routes/product');
//const ProductSQLRouter = require('./api/v1/routes/productSQL');
const CategoryRouter = require('./api/v1/routes/category');
//const CategorySQLRouter = require('./api/v1/routes/categorySQL');
const UserRouter = require('./api/v1/routes/user');
//const UserSQLRouter = require('./api/v1/routes/userSQL');
const OrderRouter = require('./api/v1/routes/order')
//const OrderSQLRouter = require('./api/v1/routes/orderSQL')
//const Auths=require("./api/v1/middlewares/Auths");



app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));


//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri = "mongodb+srv://simon:yaron123@cluster0.aas0e.mongodb.net/Ecommerce";//process.env.MONGO_CONN_STR;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('mongo db connected')});

//ניתובים,Auths
app.use("/user",UserRouter);
//app.use("/userSQL",UserSQLRouter);
//app.use("/productSQL",Auths,ProductSQLRouter);
app.use("/product",ProductRouter);
app.use("/category",CategoryRouter);
//app.use("/categorySQL",Auths,CategorySQLRouter);
app.use("/order",OrderRouter);
//app.use("/orderSQL",OrderSQLRouter);



//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 Page not Fount"})
    });
    
    module.exports = app;
