//importing module
const express = require("express");
const router = express.Router();
const {createInventory,inventory_all, inventory_update,inventory_delete,inventory_single }= require("../controller/inventoryController");
const validateToken = require ("../middleware/validateTokenHandler");

router.use(validateToken);
// router.route("/").post(createContact);

router.post("/", createInventory);
router.get("/", inventory_all);
router.put("/:inventoryId",inventory_update );
router.delete("/:inventoryId",inventory_delete);
router.get("/:inventoryId",inventory_single);



module.exports = router;