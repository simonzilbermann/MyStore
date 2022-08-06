const router = require('express').Router();
const {AddCategory,
    UpdateCategory,
    DeleteCategory,
    GetAllCategory,
    GetCategoryById}=require('../controller/categorySQL');


router.get("/",GetAllCategory);
router.post("/",AddCategory);
router.get("/:CId",GetCategoryById);
router.put("/:CId",UpdateCategory);
router.delete("/:CId",DeleteCategory);

module.exports=router;