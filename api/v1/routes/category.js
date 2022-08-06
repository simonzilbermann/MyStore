const router = require('express').Router();
const {AddCategory,
    UpdateCategory,
    DeleteCategory,
    GetAllCategory,
    GetCategoryById}=require('../controller/category');


router.get("/",GetAllCategory);
router.post("/",AddCategory);
router.get("/:Cid",GetCategoryById);
router.put("/:Cid",UpdateCategory);
router.delete("/:Cid",DeleteCategory);

module.exports=router;