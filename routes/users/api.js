const express = require("express");
const router = express.Router();
const { api } = require("../../controllers/users");
const singleUpload = require("../../utils/multer");

router.post("/create_pick_product", api.product_pick);
router.post("/deliver",singleUpload, api.product_deliver);

module.exports = router