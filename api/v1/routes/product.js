const router = require('express').Router();
const {AddProduct,
    UpdateProduct,
    DeleteProduct,
    GetAllProduct,
    GetProductById}=require('../controller/product');


router.get("/",GetAllProduct);
router.post("/",AddProduct);
router.get("/:Pid",GetProductById);
router.put("/:Pid",UpdateProduct);
router.delete("/:Pid",DeleteProduct);

module.exports=router;