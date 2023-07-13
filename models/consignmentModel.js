const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const consignmentModel = new mongoose.Schema(
    {
        unique_no: {
            type: String,
            unique:false,
            required: [true, "consignment no is required"],
        },
      
    },
    { timestamps: true }
);

const consignment = mongoose.model("consignment", consignmentModel);

module.exports = consignment;