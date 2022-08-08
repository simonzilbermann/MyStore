const router = require('express').Router();
const {AddOrder,
    UpdateOrder,
    DeleteOrder,
    GetAllOrder,
    GetOrderById}=require('../controller/order');


router.get("/",GetAllOrder);
router.post("/",AddOrder);
router.get("/:Oid",GetOrderById);
router.put("/:Oid",UpdateOrder);
router.delete("/:Oid",DeleteOrder);

module.exports=router;