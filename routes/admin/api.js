const express = require("express");
const router = express.Router();
const { api } = require("../../controllers/admin");

// user routes
router.post("/create_user",api.signup)
router.get("/get_all_user",api.getAllUSer)
router.get("/delete_user",api.delete_User)
router.get("/get_one_user",api.getOneUser)
router.post("/update_user",api.update_user)

// products routes
router.get("/get_all_products",api.getAllProducts)
router.get("/get_one_product",api.getOneProduct)
router.post("/update_product",api.update_product)
router.get("/delete_product",api.delete_Product)
router.get('/getUserByToken',api.getUserByToken)

module.exports = router