const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const SetConsignmentModelCityModel = new mongoose.Schema(
    {
        unique_no: {
            type: String,
            unique:false,
            required: [true, "consignment no is required"],
        },
        city:{
            type: String,
            required:true,
        },
        state:{
            type: String,
            required:true,
        },
    },
    { timestamps: true }
);

const SetConsignmentModelCity = mongoose.model("SetConsignmentModelCityModel", SetConsignmentModelCityModel);

module.exports = SetConsignmentModelCity;