const express = require("express");
const router = express.Router();
const { api } = require("../../controllers/users");
const singleUpload = require("../../utils/multer");

router.post("/create_pick_product", api.product_pick);
router.post("/deliver",singleUpload, api.product_deliver);
router.get("/pdf-download/:id",singleUpload, api.pdf);

module.exports = router